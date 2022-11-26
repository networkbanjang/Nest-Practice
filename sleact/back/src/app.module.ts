import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ConfigModule ,ConfigService} from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService,ConfigService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
