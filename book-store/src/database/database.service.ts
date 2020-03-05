import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { configuration } from '../config/config.keys';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
        ssl: config.get(configuration.SSL) === 'true',
        type: "postgres",
        database: config.get(configuration.DATABASE),
        host: config.get(configuration.HOST), 
        username: config.get(configuration.USERNAME),
        password: config.get(configuration.PASSWORD),
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        migrations: [__dirname + "/migrations/*{.ts,.js}"],
      } as ConnectionOptions)
  })
]