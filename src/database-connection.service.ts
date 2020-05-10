import {Injectable} from '@nestjs/common';
import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {UserEntity} from './entities/user.entity';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'mysql',
      username: process.env.SECRET,
      host: process.env.DB_HOST,
      port: 3306,
      password: process.env.DB_PASSWORD,
      database: 'nestjs-csv-api',
      synchronize: false,
      dropSchema: false,
      logging: true,
      entities: []
    };
  }
}
