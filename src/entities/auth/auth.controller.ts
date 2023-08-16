import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, UseGuards, Request } from "@nestjs/common";

import { User, UserService } from "@entities/user";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto";
import { AuthGuard } from "./auth.guard";
import { Public } from "./auth.decorators";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign_in')
  signIn(@Body() creds: AuthCredentialsDto) {
    return this.authService.signIn(creds);
  }

  @Public()
  @Post('sign_up')
  async signUp(@Body() creds: AuthCredentialsDto) {
    const user: User | undefined = await this.userService.findOne({ name: creds.name });

    if (user) {
      throw new HttpException('Пользователь уже существует', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userService.create(creds);

    return this.authService.getJWT(newUser);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}