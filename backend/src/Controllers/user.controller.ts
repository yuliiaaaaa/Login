import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import User from 'src/Entities/User';
import { UsersService } from 'src/Services/user.service';
import { CreateUserDto } from 'src/dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getUserById(+id);
    return user;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.createUser(createUserDto);
    return newUser;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<User> {
    const user = this.usersService.deleteById(Number(id));
    return user;
  }
}
