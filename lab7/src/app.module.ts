import { Module } from '@nestjs/common';
import { MovieModule } from './movie';
import { ConfigModule } from './config';
import { DbModule } from './db';

@Module({
  imports: [MovieModule, ConfigModule, DbModule],
})
export class AppModule {}
