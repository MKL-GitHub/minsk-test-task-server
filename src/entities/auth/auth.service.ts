import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User, UserService } from "@entities/user";
import { AccessTokenDto, AuthCredentialsDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(creds: AuthCredentialsDto): Promise<AccessTokenDto> {
    const user: User | undefined = await this.userService.findOne({ name: creds.name });

    if (!user || !(await bcrypt.compare(creds.password, user.password))) {
      throw new UnauthorizedException();
    }

    return this.getJWT(user);
  }

  async getJWT(user: User): Promise<AccessTokenDto> {
    const payload = { name: user.name, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

}