import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../domain/entities/user.entity';
import { RefreshToken, RefreshTokenSchema } from '../../../domain/entities/refresh-token.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../../infrastructure/guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    JwtModule.register({ global: true, secret: '123' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
