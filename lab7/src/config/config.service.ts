import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig;
  private readonly data;

  constructor() {
    this.envConfig = dotenv.config();
  }

  public get(key: string): string {
    return this.envConfig[key];
  }
}
