import {ConflictException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {LoginDto, RegisterDto, UpdateUserDto} from '../models/user.model';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from '../entities/user.entity';
import {Repository} from 'typeorm';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService) {
  }
  
  public async register(credentials: RegisterDto) {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      const payload = {username: user.name};
      const token = this.jwtService.sign(payload);
      return {user: {...user.toJson(), token}};
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException()
    }
  }
  
  public async login({email, password}: LoginDto) {
    try {
      const user = await this.userRepo.findOne({where: {email}});
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = {username: user.name};
      const token = this.jwtService.sign(payload);
      return {user: {...user.toJson(), token}};
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  
  public async findCurretUser(username: string) {
    const user = await this.userRepo.findOne({where: {username}});
    const payload = {username: user.name};
    const token = this.jwtService.sign(payload);
    return {user: {...user.toJson(), token} }
  }
  
  public async updateUser(username: string, data: UpdateUserDto) {
    await this.userRepo.update({name}, data);
    const user = await this.userRepo.findOne({where: {username}});
    const payload = {username: username};
    const token = this.jwtService.sign(payload);
    return {user: {...user.toJson(), token} }
  }
}
