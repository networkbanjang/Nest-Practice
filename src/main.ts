import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as expressBasicAuth from "express-basic-auth"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    ['/docs','/docs-json'],
    expressBasicAuth({
      challenge:true,
      users:{
        ['swagger']:process.env.SWAGGER_PASSWORD
      }
    })
  )

  const config = new DocumentBuilder()
    .setTitle('firit nest')
    .setDescription('첫 nest.js 연습')
    .setVersion('1.0')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();
