import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MovieModel } from './movie.model';

@Injectable()
export class MovieService {
  constructor(@InjectModel('Movie') private movie: Model<MovieModel>) {}

  public async getByName(name: string) {
    const foundMovies = await this.movie.find({
      original_title: new RegExp('^' + name + '$', 'i'),
    });

    return foundMovies;
  }

  public async save(data) {
    const saved = await this.movie.insertMany(data);

    return saved;
  }

  public async getPage(skip: number, limit: number) {
    return await this.movie.find({}, null, {
      skip,
      limit,
    });
  }

  public async sort({field, direction, skip = 0, limit = 10}) {
    if (direction !== 1 && direction !== -1) {
      throw new BadRequestException();
    }

    return await this.movie.find({}, null, {
      skip,
      limit,
      sort: {
        [field]: direction,
      },
    });
  }

  public async getById(id: number) {
    return await this.movie.findOne({ id });
  }
}
