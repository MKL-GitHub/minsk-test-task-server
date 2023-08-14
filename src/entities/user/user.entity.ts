import { GoodDeed } from '@entities/good-deed/good-deed.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => GoodDeed, goodDeed => goodDeed.user)
  goodDeeds: GoodDeed[];

  @ManyToMany(() => User, user => user.friends)
  @JoinTable()
  friends: User[];
}
