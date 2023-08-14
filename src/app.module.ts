import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { TypeOrmModule } from '@db/typeorm.module';

import { AuthModule } from '@entities/auth';
import { GoodDeedModule } from '@entities/good-deed';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    AuthModule,
    GoodDeedModule,
  ],
})
export class AppModule { }
