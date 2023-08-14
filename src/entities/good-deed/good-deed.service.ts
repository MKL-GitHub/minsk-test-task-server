import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { GoodDeed } from "./good-deed.entity";
import { Repository } from "typeorm";
import { User, UserService } from "@entities/user";

@Injectable()
export class GoodDeedService {
  constructor(
    @InjectRepository(GoodDeed)
    private goodDeedRepository: Repository<GoodDeed>,
    private userService: UserService,
  ) { }

  async create(user: User, goodDeed: Partial<GoodDeed>): Promise<GoodDeed> {
    const newGoodDeed: GoodDeed = this.goodDeedRepository.create({
      ...goodDeed, user
    });

    return this.goodDeedRepository.save(newGoodDeed);
  }

  async getAll(user: User): Promise<GoodDeed[]> {
    return this.goodDeedRepository.find({ where: { user } });
  }

  async getOneById(id: number): Promise<GoodDeed> {
    const goodDeed: GoodDeed = await this.goodDeedRepository.findOne({ where: { id } });

    if (!goodDeed) {
      throw new NotFoundException('Доброе дело не найдено');
    }

    return goodDeed;
  }
}