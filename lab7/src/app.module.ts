import { Module } from '@nestjs/common';

import { MovieModule } from './movie';
import { ConfigModule } from './config';

@Module({
  imports: [MovieModule, ConfigModule],
})
export class AppModule {}
