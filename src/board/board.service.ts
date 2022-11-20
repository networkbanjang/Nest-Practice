import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BoardORM } from './entity/board.entity';
import { BoardStatus } from './board.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardDto } from './dto/board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardORM)
    private boardRepository: Repository<BoardORM>,
  ) {}

  async getAllBoards(): Promise<BoardORM[]> {
    return this.boardRepository.find({order : {createdAt:"DESC"}})
  }

  async createBoard(boardDto: BoardDto): Promise<BoardORM> {
    const { title, description } = boardDto;
    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<BoardORM> {
    const found = await this.boardRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException('찾을수 없음');
    }
    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't Find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<BoardORM> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
}
