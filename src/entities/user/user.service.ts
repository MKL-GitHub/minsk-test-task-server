import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(user: Partial<User>): Promise<User> {
    const newUser: User = this.usersRepository.create(user);

    newUser.password = await bcrypt.hash(user.password, +process.env.BCRYPT_ROUNDS);

    return this.usersRepository.save(newUser);
  }

  async findOne(where: Partial<User>, relations?: string[]): Promise<User | null> {
    return this.usersRepository.findOne({ where, relations });
  }

  async delete(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['goodDeeds'] });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    await this.usersRepository.remove(user);
  }

  async addFriend(user: User, friendId: number): Promise<void> {
    const hasFriend: boolean = user.friends.some(friend => friend.id === friendId);

    if (hasFriend) {
      throw new ConflictException('Пользователь уже добавлен к вам в друзья');
    }

    const friend: User | null = await this.usersRepository.findOne({ where: { id: friendId } });

    if (!friend) {
      throw new NotFoundException('Друг не найден');
    }

    user.friends.push(friend);

    await this.usersRepository.save(user);
  }

  async getFriend(user: User, friendId: number): Promise<User> {
    const friend: User | undefined = user.friends.find(friend => friend.id === friendId);

    if (!friend) {
      throw new NotFoundException('Друг не найден');
    }

    return friend;
  }

  async getAllFriends(userId: number): Promise<User[]> {
    const user: User | null = await this.usersRepository.findOne(
      { where: { id: userId }, relations: ['friends'] }
    );

    return user.friends;
  }
}