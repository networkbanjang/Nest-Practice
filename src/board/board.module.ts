import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardORM } from './entity/board.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[TypeOrmModule.forFeature([BoardORM]),
        AuthModule,
      MulterModule.register({
        dest:'./upload'    //저장 경로
      })],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
