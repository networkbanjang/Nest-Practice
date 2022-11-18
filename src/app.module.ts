import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [BoardModule,ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})

export class AppModule {}
