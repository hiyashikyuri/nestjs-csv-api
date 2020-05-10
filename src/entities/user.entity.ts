import {AbstractEntity} from './abstract-entity';
import {BeforeInsert, Column, Entity} from 'typeorm';
import {IsEmail} from 'class-validator';
import {classToPlain, Exclude} from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity()
export class UserEntity extends AbstractEntity {
  @Column({unique: true})
  @IsEmail()
  email: string;
  
  @Column()
  name: string;
  
  @Column({default: null, nullable: true})
  company: string;
  
  @Column({default: null, nullable: true})
  industry: string;
  
  @Column()
  @Exclude()
  password: string;
  
  @BeforeInsert()
  public async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
  public async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
  
  public toJson() {
    return classToPlain(this)
  }
}
