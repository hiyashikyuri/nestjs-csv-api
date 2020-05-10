import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from '../entities/user.entity';
import {Repository} from 'typeorm';
import {UpdateUserDto} from '../models/user.model';

@Injectable()
export class UserService {
  
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {
  }
  
  public async findByName(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({where: {username: username}})
  }
  
  public async updateUser(username: string, data: UpdateUserDto) {
    await this.userRepo.update({name}, data);
    return this.findByName(username);
  }
}
