import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardORM } from './board/entity/board.entity';

@Module({
  imports: [
    BoardModule,
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot(
      {
      type: "mysql",    //사용하는 DB, mysql , oracle등등
      host: "localhost",
      port: 3306,
      username: "root",
      password: process.env.DBPASSWORD,
      database: "nestcat",
      entities: [BoardORM],
      synchronize: true,   //동기화
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
