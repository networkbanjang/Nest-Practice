import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { BoardDto } from './dto/board.dto';

@Injectable()
export class BoardService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(boardDto: BoardDto): Board {
    const { title, description } = boardDto;
    console.log(typeof title);
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);

    return board;
  }

  getBoardById(id: string): Board {
    const found =this.boards.find((element) => element.id === id);
    if(!found){
      throw new NotFoundException('찾을수 없음');
    }
    return found
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id)
    this.boards = this.boards.filter((element) => element.id !== found.id);
  }
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
