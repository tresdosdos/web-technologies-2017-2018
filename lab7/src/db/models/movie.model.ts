import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import GenreId from './genre-id.model';

@Table({ tableName: 'movie' })
export default class Movie extends Model<Movie> {
  @Column
  vote_count: number;

  @Column
  vote_average: number;

  @Column
  title: string;

  @Column
  popularity: number;

  @Column
  poster_path: string;

  @Column
  original_language: string;

  @Column
  original_title: string;

  @HasMany(() => GenreId)
  genre_ids: GenreId[];

  @Column
  backdrop_path: string;

  @Column
  adult: boolean;

  @Column({type: DataType.STRING(1000)})
  overview: string;

  @Column
  release_date: string;
}
