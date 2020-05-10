import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DatabaseConnectionService} from './database-connection.service';
import {EasyconfigModule} from 'nestjs-easyconfig';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({useClass: DatabaseConnectionService}),
    EasyconfigModule.register({path: './.env'}),
    AuthModule,
    UserModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
