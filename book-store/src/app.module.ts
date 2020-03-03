import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(
    private readonly _configService: ConfigService
  ){
    AppModule.port = this._configService.get(configuration.PORT)

  }
}
