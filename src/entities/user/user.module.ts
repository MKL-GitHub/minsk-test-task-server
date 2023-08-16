import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMiddleware } from './user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
