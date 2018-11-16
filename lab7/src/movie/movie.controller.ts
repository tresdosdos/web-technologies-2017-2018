import * as _ from 'lodash';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common';

import { MovieService } from './movie.service';
import { MOVIE_EXAMPLE } from '../constants';
import { ConfigService } from '../config';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService, private configService: ConfigService) {}

  @Get('save')
  async saveJson(@Req() req, @Res() res) {
    const data = this.configService.getData();
    const movies = await this.movieService.save(data);
    res.send(movies);
  }

  @Get('name/:name')
  async getByName(@Req() req, @Res() res) {
    const foundMovie = await this.movieService.getByName(req.params.name);

    if (!foundMovie) {
      throw new BadRequestException();
    }

    res.send(foundMovie);
  }

  @Get()
  async getPage(@Query() query, @Res() res) {
    const { field, direction, offset, limit } = query;
    const propsKeys = Object.keys(MOVIE_EXAMPLE);

    if (
      !field ||
      !direction ||
      !_.includes(propsKeys, query.field)
    ) {
      const currentPage = await this.movieService.getPage(+query.offset, +query.limit);

      res.send(currentPage);
    } else {
      const sortedMovies = await this.movieService.sort({
        field,
        direction: +direction,
      });

      res.send(sortedMovies);
    }
  }

  @Get('id/:id')
  async getById(@Param() param, @Res() res) {
    if (isNaN(+param.id) || +param.id < 0) {
      throw new BadRequestException();
    }

    const foundMovie = await this.movieService.getById(+param.id);

    res.send(foundMovie);
  }
}
