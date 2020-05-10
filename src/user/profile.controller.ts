import {Controller, Get, NotFoundException, Param} from '@nestjs/common';
import {UserService} from './user.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly userService: UserService) {
  }
  
  @Get('/:username')
  public async findProfile(@Param('name') name: string) {
    const user = await this.userService.findByName(name);
    if (!user) {
      throw new NotFoundException();
    }
    return {profile: user};
  }
}
