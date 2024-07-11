import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh.tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

//POST SIGNUP
@Post('signup')  //auth/signup
async signUp(@Body() signupData: SignupDto) {
  return this.authService.signup(signupData);
}








//POST LOGIN
@Post('login')
async login(@Body() Credentials: LoginDto ){
  return this.authService.login(Credentials)
}
//POST REFRESH TOKEN
@Post('refresh')
async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
  return this.authService.refreshTokens(refreshTokenDto.refreshToken);

}


}
