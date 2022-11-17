import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  UseFilters,
  Post,
  Body,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { Board } from './board.model';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('')
  getAllBoards(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Get('errorTest')
  @UseFilters(HttpExceptionFilter)
  errTest() {
    throw new HttpException('고의적 에러', 401);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return `${id}`;
  }

  @Post()
  createBoard(
    @Body('title') title: string,
    @Body('description') description: string,
  ):Board {

    return this.boardService.createBoard(title,description)
  }
}
