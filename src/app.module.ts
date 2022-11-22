import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardORM } from './board/entity/board.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BoardModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql', //사용하는 DB, mysql , oracle등등
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.DBPASSWORD,
      database: 'nestcat',
      entities: [BoardORM,User],
      synchronize: true, //동기화
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
