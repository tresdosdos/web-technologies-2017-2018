import { Symbols } from '../symbols';
import Movie from './models/movie.model';
import GenreId from './models/genre-id.model';

export const movieProviders = [
  {
    provide: Symbols.Movie,
    useValue: Movie,
  },
  {
    provide: Symbols.GenreId,
    useValue: GenreId,
  },
];
