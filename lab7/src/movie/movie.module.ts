import { Module } from '@nestjs/common';

import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { ConfigModule } from '../config';

@Module({
  imports: [ConfigModule],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
