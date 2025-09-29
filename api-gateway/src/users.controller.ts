import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  async createUser(@Body() userDto: any) {
    return this.client.send({ cmd: 'create-user' }, userDto);
  }

  @Get()
  async getUsers() {
    return this.client.send({ cmd: 'get-users' }, {});
  }
}
