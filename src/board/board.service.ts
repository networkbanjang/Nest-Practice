import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BoardORM } from './entity/board.entity';
import { BoardStatus } from './board.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardDto } from './dto/board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardORM) private boardRepository: Repository<BoardORM>,
  ) {}


  async createBoard(boardDto: BoardDto): Promise<BoardORM> {
    const { title, description } = boardDto;
    const board = this.boardRepository.create({
      title,
      description,
      status:BoardStatus.PUBLIC
    })
    await this.boardRepository.save(board);
    return board;
  }

  // getBoardById(id: string): BoardDTO {
  //   const found = this.boards.find((element) => element.id === id);
  //   if (!found) {
  //     throw new NotFoundException('찾을수 없음');
  //   }
  //   return found;
  // }

  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((element) => element.id !== found.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): BoardDTO {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
