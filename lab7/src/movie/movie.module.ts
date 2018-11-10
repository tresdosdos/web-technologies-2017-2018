import { Module } from '@nestjs/common';

import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { DbModule } from '../db';

@Module({
  imports: [DbModule],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
