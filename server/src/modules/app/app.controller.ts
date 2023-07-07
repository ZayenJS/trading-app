import { Controller, Get, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { NestSession } from '../../models/NestSession';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  home(@Session() session: NestSession) {
    return this.appService.home(session);
  }
}
