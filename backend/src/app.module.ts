import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './api-gateway/modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { QrCodeModule } from './api-gateway/modules/qr-code/qr-code.module';
import { jwtConstants } from './shared/constants/auth.constants';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mydatabase'),
    JwtModule.register({ global: true, secret: jwtConstants.secret }),
    AuthModule,
    QrCodeModule,
  ],
})
export class AppModule {}
