import { HttpService, Injectable } from '@nestjs/common';

import { ConfigService } from '../config';
import { map } from 'rxjs/operators';

@Injectable()
export class MovieService {
  constructor(private httpService: HttpService, private config: ConfigService) {}

  public getByName(name: string) {
    return this.httpService.get(`${this.config.get('BASE_URL')}/search/movie?api_key=${this.config.get('MOVIE_KEY')}&query=${name}`).pipe(
      map(response => response.data),
    );
  }
}
