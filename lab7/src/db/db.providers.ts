import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

import { Symbols } from '../symbols';
import Movie from './models/movie.model';
import GenreId from './models/genre-id.model';

dotenv.config();

export const dbProviders = [
  {
    provide: Symbols.SequelizeToken,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        logging: false,
        operatorsAliases: {
          $gt: Sequelize.Op.gt,
        },
      });
      sequelize.addModels([
        Movie,
        GenreId,
      ]);
      await sequelize.sync({force: true});
      return sequelize;
    },
  },
];
