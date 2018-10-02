import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie';
import { ConfigModule } from './config';

@Module({
  imports: [MovieModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
