import {
  Controller,
  Get,
  HttpException,
  Param,
  UseFilters,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';

import { HttpExceptionFilter } from 'src/http-exception.filter';
import { Board, BoardStatus } from './board.model';
import { BoardService } from './board.service';
import { BoardDto } from './dto/board.dto';
import { BoardStatusValidationPipe } from './pipes/board.pipe';

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
  getBoardById(@Param('id') id: string) {
    return this.boardService.getBoardById(id);
  }

  @Delete(':id')
  deleteBoard(@Param('id') id: string) {
    return this.boardService.deleteBoard(id);
  }

  @Post()
  createBoard(@Body() boardDto: BoardDto): Board {
    return this.boardService.createBoard(boardDto);
  }

  @Patch(':id')
  updateBoardStatus(
    @Param('id') id,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Board {
    return this.boardService.updateBoardStatus(id, status);
  }
}

//@Param() params 하면 파라미터값 다가져옴
