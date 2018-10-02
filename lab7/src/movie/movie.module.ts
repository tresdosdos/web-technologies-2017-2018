import { HttpModule, Module } from '@nestjs/common';

import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { ConfigModule } from '../config';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }), ConfigModule],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
