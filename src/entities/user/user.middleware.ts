import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from './user.service';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) { }

  use(req: Request, res: Response, next: NextFunction) {
    req['userService'] = this.userService;
    next();
  }
}