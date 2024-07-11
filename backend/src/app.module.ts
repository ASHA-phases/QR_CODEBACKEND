import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QrCodeService } from './qr-code/qr-code.service';
import { QrCodeController } from './qr-code/qr-code.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ global:true, secret: '123'}),



    MongooseModule.forRoot('mongodb://localhost:27017/mydatabase'),
    AuthModule,
  ],
  controllers: [AppController, QrCodeController],
  providers: [AppService, QrCodeService],
})
export class AppModule {}
