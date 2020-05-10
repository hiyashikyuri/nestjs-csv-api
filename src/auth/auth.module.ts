import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from '../entities/user.entity';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from './jwt.strategy';
import {EasyconfigModule} from 'nestjs-easyconfig';

@Module({
  imports: [
    EasyconfigModule.register({path: './.env'}),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '1h',
      }
    }),
    PassportModule.register({defaultStrategy: 'jwt'})
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy]
})
export class AuthModule {
}
