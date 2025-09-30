import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  async create(
    @Body() body: { name: string; email: string; password: string },
  ) {
    return this.client.send({ cmd: 'create_user' }, body);
  }

  @Get()
  async findAll() {
    return this.client.send({ cmd: 'find_all_users' }, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'find_user_by_id' }, { id });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; email?: string },
  ) {
    return this.client.send({ cmd: 'update_user' }, { id, ...body });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.client.send({ cmd: 'delete_user' }, { id });
  }
}
