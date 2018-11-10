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

import { ConfigService } from '../config';
import { MovieService } from './movie.service';
import { MOVIE_EXAMPLE } from '../constants';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

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
    const currentPage = await this.movieService.getPage(query.offset, query.limit);

    res.send(currentPage);
  }

  @Get('sort')
  async getSortedData(@Query() query, @Res() res) {
    const propsKeys = Object.keys(MOVIE_EXAMPLE);

    if (
      !query.field ||
      !query.direction ||
      !_.includes(propsKeys, query.field)
    ) {
      throw new BadRequestException();
    }

    const firstPage = await this.movieService.getPage(0, 20);
    const sortedMovies = this.movieService.sort(
      firstPage,
      query.field,
      +query.direction,
    );

    res.send(sortedMovies);
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
