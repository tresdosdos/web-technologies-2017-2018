import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

import { MovieModel } from '../movie';

@Injectable()
export class ConfigService {
  private readonly data;

  constructor(private filePath: string) {
    this.data = fs.readFileSync(path.join(__dirname + '/data.json'));
  }

  public getData(): MovieModel[] {
    return JSON.parse(this.data);
  }
}
