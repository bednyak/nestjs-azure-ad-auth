import {Controller, Get, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {AzureADGuard} from "./auth.strategy";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AzureADGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
