import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    // Suscribimos los topics para recibir respuestas si es necesario
    this.client.subscribeToResponseOf('create_user');
    this.client.subscribeToResponseOf('find_all_users');
    this.client.subscribeToResponseOf('find_user_by_id');
    this.client.subscribeToResponseOf('update_user');
    this.client.subscribeToResponseOf('delete_user');
    await this.client.connect();
  }

  @Post()
  async create(@Body() createUserDto: any) {
    // Envía el mensaje al topic 'create_user'
    return this.client.emit('create_user', createUserDto);
  }

  @Get()
  async findAll() {
    // Envía el mensaje al topic 'find_all_users'
    return this.client.send('find_all_users', {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Envía el mensaje al topic 'find_user_by_id'
    return this.client.send('find_user_by_id', { id });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    // Envía el mensaje al topic 'update_user'
    return this.client.emit('update_user', { id, ...updateUserDto });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // Envía el mensaje al topic 'delete_user'
    return this.client.emit('delete_user', { id });
  }
}
