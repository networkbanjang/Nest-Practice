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
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';

import { HttpExceptionFilter } from 'src/http-exception.filter';
import { BoardORM } from './entity/board.entity';
import { BoardStatus } from './board.enum';
import { BoardService } from './board.service';
import { BoardDto } from './dto/board.dto';
import { BoardStatusValidationPipe } from './pipes/board.pipe';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('board')
@UseGuards(JwtAuthGuard)
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('')
  getAllBoards(): Promise<BoardORM[]> {
    return this.boardService.getAllBoards();
  }

  @Get('errorTest')
  @UseFilters(HttpExceptionFilter)
  errTest() {
    throw new HttpException('고의적 에러', 401);
  }

  @Get(':id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<BoardORM> {
    return this.boardService.getBoardById(id);
  }

  @Delete(':id')
  deleteBoard(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.deleteBoard(id);
  }

  @Post()
  createBoard(@Body() boardDto: BoardDto, @Req() req): Promise<BoardORM> {
    return this.boardService.createBoard(boardDto, req.user);
  }

  @Patch(':id')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<BoardORM> {
    return this.boardService.updateBoardStatus(id, status);
  }
}

//@Param() params 하면 파라미터값 다가져옴
