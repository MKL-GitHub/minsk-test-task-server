import { Injectable, NotFoundException } from "@nestjs/common";
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

  async findOne(where: Partial<User>): Promise<User | null> {
    return this.usersRepository.findOne({ where });
  }

  async addFriend(user: User, friendId: number): Promise<void> {
    const friend: User | null = await this.usersRepository.findOne({ where: { id: friendId } });

    if (!friend) {
      throw new NotFoundException('Друг не найден');
    }

    user.friends = [...user.friends, friend];

    await this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['goodDeeds'] });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    await this.usersRepository.remove(user);
  }
}