import { Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";
import { Request } from 'express';

import { UserService } from "./user.service";
import { UserFromAuthGuard } from "./user-from-auth-guard.decorator";
import { User } from "./user.entity";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('friends/:id')
  async addFriend(
    @UserFromAuthGuard(['friends']) user: User,
    @Param('id') friendId: string
  ) {

    await this.userService.addFriend(user, +friendId);
    return { message: 'Друг был успешно добавлен' };
  }

  @Get('friends')
  async getAllFriends(@Req() req: Request) {
    return this.userService.getAllFriends(req['user'].id);
  }

  @Get('friends/:id')
  getOneFriend(
    @UserFromAuthGuard(['friends']) user: User,
    @Param('id') friendId: string
  ) {
    return this.userService.getFriend(user, +friendId);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}