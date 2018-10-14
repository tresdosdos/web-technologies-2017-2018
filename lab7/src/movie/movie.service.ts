import { BadRequestException, Injectable } from '@nestjs/common';

import { ConfigService } from '../config';
import { MovieModel } from './movie.model';

@Injectable()
export class MovieService {
  private data = this.config.getData();

  constructor(private config: ConfigService) {}

  public getByName(name: string): MovieModel {
    return this.data.find(movie =>
      movie.original_title.toLowerCase().includes(name.toLowerCase()),
    );
  }

  public getPage(offset: number = 0, limit: number = 0): MovieModel[] {
    return this.data.slice(offset, offset + limit);
  }

  public sort(
    movies: MovieModel[],
    field: string,
    direction: number,
  ): MovieModel[] {
    if (direction !== 1 && direction !== -1) {
      throw new BadRequestException();
    }

    return movies.sort((movie1, movie2) => {
      if (movie1[field] > movie2[field]) {
        return direction;
      }

      if (movie1[field] < movie2[field]) {
        return -1 * direction;
      }

      return 0;
    });
  }

  public getById(id: number): MovieModel {
    return this.data.find(movie => movie.id === id);
  }
}
