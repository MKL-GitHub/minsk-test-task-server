import { User } from '@entities/user';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('good_deeds')
export class GoodDeed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => User, user => user.goodDeeds, { onDelete: 'CASCADE' })
  user: User;
}
