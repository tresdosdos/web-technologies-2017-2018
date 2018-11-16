import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly data;

  constructor() {
    this.data = fs.readFileSync(path.join(__dirname + '/data.json'));
  }

  public getData() {
    return JSON.parse(this.data);
  }
}
