import { Body, Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import {Request} from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req : Request,@Body() body,): string {
    if(req.body === body) console.log(req.body===body)
    return this.appService.getHello();
  }
}
