import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import Movie from './movie.model';

@Table({ tableName: 'genre_id' })
export default class GenreId extends Model<GenreId> {
  @BelongsTo(() => Movie, { onDelete: 'cascade' })
  movie: Movie;

  @ForeignKey(() => Movie)
  @Column
  movieId: number;
}