import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from 'express';

import { GoodDeed } from "./good-deed.entity";
import { GoodDeedService } from "./good-deed.service";
import { AuthGuard } from "@entities/auth";
import { User } from "@entities/user";

@UseGuards(AuthGuard)
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
    return await this.goodDeedService.getAll(req.user);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.goodDeedService.getOneById(id);
  }

  // @Put(':id')
  // update(@Req() req: Request, @Res() res: Response) {

  // }

  // @Patch(':id')
  // updateField(@Req() req: Request, @Res() res: Response) {

  // }

  // @Delete(':id')
  // delete(@Req() req: Request, @Res() res: Response) {

  // }
}