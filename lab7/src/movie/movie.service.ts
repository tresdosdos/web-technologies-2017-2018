import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import Movie from '../db/models/movie.model';
import GenreId from '../db/models/genre-id.model';
import { Symbols } from '../symbols';

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

    if (!foundMovies) {
        throw new BadRequestException();
    }

    return this.buildIds(foundMovies.toJSON());
  }

  public async getPage(offset: number, limit: number) {
    return await this.movie.findAll({
      offset,
      limit,
      include: [this.genreId],
    });
  }

  public async sort({field, direction, offset = 0, limit = 10}) {
    if (direction !== 1 && direction !== -1) {
      throw new BadRequestException();
    }

    let movies = await this.movie.findAll({
      offset,
      limit,
      order: [`${field}`, direction === 1 ? 'ASC' : 'DESC'],
    });

    movies = movies.map(movie => movie.toJSON());

    return movies.map(movie => this.buildIds(movie));
  }

  public async getById(id: number) {
    const movie = await this.movie.findOne({
      where: {
        id,
      },
      include: [this.genreId],
    });

    if (!movie) {
      throw new BadRequestException();
    }

    return this.buildIds(movie.toJSON());
  }

  private buildIds(movie: Movie) {
    const genre_ids = movie.genre_ids.map(id => id.value);

    return Object.assign(movie, {genre_ids});
  }
}
