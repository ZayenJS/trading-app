import { Controller, Get, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { NestSession } from '../../models/NestSession';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    tags: ['App'],
    summary:
      'Test route to check if the API is running - no need to be logged in',
  })
  @ApiResponse({ status: 200, description: 'The API is running' })
  @Get()
  home(@Session() session: NestSession) {
    return this.appService.home(session);
  }
}
