import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';
import { User, UserService } from '@entities/user';

export const UserFromAuthGuard = createParamDecorator(
  async (relations: string[], context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const userService: UserService = request.userService;

    const user: User | null = await userService.findOne({ id: request.user.sub }, relations);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    request.user = user;

    return request.user;
  }
)
