import { Controller, Get, HttpException, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('')
  boardIndex() {
    return this.boardService.getHi();
  }

  @Get('errorTest')
  @UseFilters(HttpExceptionFilter)
  errTest(){
    throw new HttpException('고의적 에러',401);
  }
}
