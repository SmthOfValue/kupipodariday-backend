import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Length, IsDefined } from 'class-validator';
import { Wish } from './../../wishes/entities/wish.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @IsDefined()
  @Length(1, 250)
  name: string;

  @Column()
  @Length(1500)
  description: string;

  @Column()
  image: string;

  @OneToMany(() => Wish, (wish) => wish.id)
  items: Wish[];
}
