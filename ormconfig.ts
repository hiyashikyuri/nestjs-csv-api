import {UserEntity} from './src/entities/user.entity';

export = {
  name: 'default',
  type: 'mysql',
  username: 'root',
  host: 'localhost',
  port: 3306,
  password: '',
  database: 'nestjs-csv-api',
  // シンクロナイズがあると勝手に反映される？
  synchronize: false,
  logging: true,
  entities: [UserEntity],
  migrations: [
    'src/db/migrations/*.ts',
  ],
  cli: {
    migrationsDir: 'src/db/migrations',
  }
};
