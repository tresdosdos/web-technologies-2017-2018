import { Controller, Get, Req, Res } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('name/:name')
  async getByName(@Req() req, @Res() res) {
    this.movieService.getByName(req.params.name).subscribe((movie: any) => {
      res.send(movie.results[0]);
    });
  }


}
