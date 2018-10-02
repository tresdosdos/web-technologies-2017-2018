import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig;

  constructor(private filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  public get(key: string): string {
    return this.envConfig[key];
  }
}