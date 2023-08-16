import {
  Injectable, CanActivate, ExecutionContext,
  UnauthorizedException, NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { User, UserService } from "@entities/user";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./auth.decorators";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request.user = await this.jwtService.verifyAsync(
        token, { secret: process.env.JWT_SECRET_KEY }
      );
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}