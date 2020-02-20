import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const { env } = process;
    const isDev = env.NODE_ENV !== 'production';
    if (isDev) {
      const envPath = __dirname + '/../../.env';
      const existsEnv = fs.existsSync(envPath);

      if (!existsEnv) {
        console.error('.env file not exists.');
        process.exit(0);
      }

      this.envConfig = parse(fs.readFileSync(envPath));
    } else {
      this.envConfig = {
        PORT: env.PORT
      }
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}