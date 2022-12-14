import { User } from 'src/auth/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardStatus } from '../board.enum';

@Entity()
export class BoardORM extends BaseEntity {
  @PrimaryGeneratedColumn() //기본 키 값
  id: number;
  @Column("varchar",{length:100})
  title: string;
  @Column({nullable :true})   //null 가능
  description: string;
  @Column()
  status: BoardStatus;
  @CreateDateColumn() //createdAt
  createdAt: Date;
  @UpdateDateColumn() //updaatedAt
  updatedAt: Date;
  @Column({default:222})  //default value
  default: number

  @ManyToOne(type =>User, user=>user.boards, {eager:false,onDelete: 'CASCADE'})
  user:User;
}