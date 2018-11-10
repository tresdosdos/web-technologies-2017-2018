import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { MovieModel } from './movie.model';
import { Symbols } from '../symbols';
import Movie from '../db/models/movie.model';
import GenreId from '../db/models/genre-id.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class MovieService {
  constructor(@Inject(Symbols.Movie) private movie: typeof Movie,
              @Inject(Symbols.GenreId) private genreId: typeof GenreId) {
  }

  public async getByName(name: string) {
    const foundMovies = await this.movie.findOne({where: {
      original_title: {
        [Sequelize.Op.iLike]: '%' + name + '%',
      },
      }, include: [this.genreId]},
    );

    return foundMovies.toJSON();
  }

  public async getPage(offset: number, limit: number) {
    return await this.movie.findAll({
      offset,
      limit,
      include: [this.genreId],
    });
  }

  public sort(
    movies,
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

  public async getById(id: number) {
    return await this.movie.findOne({
      where: {
        id,
      },
      include: [this.genreId],
    });
  }
}
