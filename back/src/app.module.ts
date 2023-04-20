import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PassportModule} from "@nestjs/passport";
import {AzureAdStrategy} from "./auth.strategy";

@Module({
  imports: [PassportModule],
  controllers: [AppController],
  providers: [AppService, AzureAdStrategy],
})
export class AppModule {}
