import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

import { MovieModel } from '../movie';

@Injectable()
export class ConfigService {
  private readonly envConfig;
  private readonly data;

  constructor(private filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    this.data = fs.readFileSync(path.join(__dirname + '/data.json'));
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public getData(): MovieModel[] {
    return JSON.parse(this.data);
  }
}
