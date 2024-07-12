import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { SignupDto } from '../../../infrastructure/dtos/signup.dto';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { User } from '../../../domain/entities/user.entity';
  import { LoginDto } from '../../../infrastructure/dtos/login.dto';
  import { JwtService } from '@nestjs/jwt';
  import { RefreshToken } from '../../../domain/entities/refresh-token.entity';
  import { hashPassword, comparePasswords, generateAccessToken, generateRefreshToken, calculateExpiryDate } from '../../../infrastructure/utils/auth.utils';
  import { jwtConstants } from '../../../shared/constants/auth.constants';
  
  @Injectable()
  export class AuthService {
    constructor(
      @InjectModel(User.name) private UserModel: Model<User>,
      @InjectModel(RefreshToken.name) private RefreshTokenModel: Model<RefreshToken>,
      private jwtService: JwtService,
    ) {}
  
    async signup(signupData: SignupDto) {
      const { email, password, name } = signupData;
  
      // Check if email is in use
      const emailInUse = await this.UserModel.findOne({ email });
      if (emailInUse) {
        throw new BadRequestException('email already in use');
      }
  
      // Hash password
      const hashedPassword = await hashPassword(password);
  
      // Create user document and save in MongoDB
      await this.UserModel.create({ name, email, password: hashedPassword });
    }
  
    async login(Credentials: LoginDto) {
      const { email, password } = Credentials;
  
      // Find if the user exists by email
      const user = await this.UserModel.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('wrong credentials');
      }
  
      // Compare entered password with existing password
      const passwordMatch = await comparePasswords(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('wrong credentials');
      }
  
      // Generate JWT tokens
      const tokens = await this.generateUserTokens(user._id.toString()); // Ensure userId is a string
      return { ...tokens, userId: user._id };
    }
  
    async refreshTokens(refreshToken: string) {
      const token = await this.RefreshTokenModel.findOne({
        token: refreshToken,
        expiryDate: { $gte: new Date() },
      });
      if (!token) {
        throw new UnauthorizedException('refresh token is invalid');
      }
  
      return this.generateUserTokens(token.userId.toString()); // Ensure userId is a string
    }
  
    async generateUserTokens(userId: string) { // Explicitly type userId as string
      const accessToken = await generateAccessToken(this.jwtService, userId);
      const refreshToken = generateRefreshToken();
  
      await this.storeRefreshToken(refreshToken, userId);
      return { accessToken, refreshToken };
    }
  
    async storeRefreshToken(token: string, userId: string) {
      // Calculate expiry date 3 days from now
      const expiryDate = calculateExpiryDate(jwtConstants.refreshExpiryDays);
  
      await this.RefreshTokenModel.updateOne({ userId }, { $set: { expiryDate, token } }, { upsert: true });
    }
  }
  