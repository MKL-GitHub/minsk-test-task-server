import { Controller, Delete, Param, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@entities/auth";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}