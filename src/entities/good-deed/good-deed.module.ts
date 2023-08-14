import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GoodDeed } from "./good-deed.entity";
import { GoodDeedController } from "./good-deed.controller";
import { GoodDeedService } from "./good-deed.service";
import { UserModule } from "@entities/user";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([GoodDeed])],
  controllers: [GoodDeedController],
  exports: [GoodDeedService],
  providers: [GoodDeedService],
})
export class GoodDeedModule { }