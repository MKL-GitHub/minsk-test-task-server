import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@entities/user';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME }
    }),
    UserModule,
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    AuthService,
  ],
})
export class AuthModule { }
