import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";

import { GoodDeed } from "./good-deed.entity";
import { GoodDeedService } from "./good-deed.service";
// import { AuthGuard } from "@entities/auth";

// @UseGuards(AuthGuard)
@Controller('good_deeds')
export class GoodDeedController {
  constructor(private readonly goodDeedService: GoodDeedService) { }

  @Post()
  async create(
    @Req() req,
    @Body() goodDeedData: Partial<GoodDeed>
  ) {
    return await this.goodDeedService.create(req.user, goodDeedData)
  }

  @Get()
  async getAll(@Req() req) {
    return await this.goodDeedService.getAllByUser(req.user);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.goodDeedService.getOneById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatedGoodDeed: Partial<GoodDeed>) {
    return this.goodDeedService.update(id, updatedGoodDeed);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.goodDeedService.delete(id);
    return { message: 'Доброе дело было успешно удалено' };
  }
}