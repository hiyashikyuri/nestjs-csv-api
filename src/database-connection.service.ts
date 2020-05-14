import {Injectable} from '@nestjs/common';
import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {UserEntity} from './entities/user.entity';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'mysql',
      username: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      dropSchema: false,
      logging: true,
      entities: [
        "src/entities/*.ts"
      ],
      migrations: [
        "src/db/migrations/*.ts"
      ],
    };
  }
}
