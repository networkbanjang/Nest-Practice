import { BoardORM } from 'src/board/entity/board.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['userName'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @CreateDateColumn() //createdAt
  createdAt: Date;
  @UpdateDateColumn() //updaatedAt
  updatedAt: Date;

  @OneToMany((type) => BoardORM, boardORM => boardORM.user, { eager: false })
  boards: BoardORM[];
}
