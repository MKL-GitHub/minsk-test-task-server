import { Module } from '@nestjs/common';

import { ConfigModule } from './config.module';
import { AuthModule } from '@entities/auth';
import { TypeOrmModule } from '@db/typeorm.module';

import { GoodDeedModule } from '@entities/good-deed';
import { UserModule } from '@entities/user';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    AuthModule,
    GoodDeedModule,
    UserModule,
  ],
})
export class AppModule { }
