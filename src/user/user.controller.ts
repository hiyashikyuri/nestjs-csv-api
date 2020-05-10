import {Body, Controller, Get, Put, UseGuards, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from '../auth/user.decorator';
import {AuthGuard} from '@nestjs/passport';
import {UserEntity} from '../entities/user.entity';
import {UpdateUserDto} from '../models/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  
  @Get()
  @UseGuards(AuthGuard())
  public findUser(@User() {name}: UserEntity) {
    return this.userService.findByName(name);
  }
  
  @Put()
  @UseGuards(AuthGuard())
  public update(
    @User() {name}: UserEntity,
    @Body(new ValidationPipe({transform: true, whitelist: true})) data: UpdateUserDto) {
    return this.userService.updateUser(name, data);
  }
}
