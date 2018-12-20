import { Module } from '@nestjs/common';
import { movieProviders } from './movie.providers';
import { dbProviders } from './db.providers';

@Module({
  providers: [...movieProviders, ...dbProviders],
  exports: [...movieProviders, ...dbProviders],
})
export class DbModule {}
