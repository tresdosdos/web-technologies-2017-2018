import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { DbModule } from '../db';
import { MovieSchema } from '../db/models/movie.model';
import { ConfigModule } from '../config';

@Module({
  imports: [DbModule, MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]), ConfigModule],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
