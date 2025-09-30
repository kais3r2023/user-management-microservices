import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { UpdateUserCommand } from '../../application/commands/update-user.command';
import { DeleteUserCommand } from '../../application/commands/delete-user.command';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const command = new CreateUserCommand(body.name, body.email, body.password);
    return this.userService.create(command);
  }

  @Get()
  async findAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; email?: string },
  ) {
    const command = new UpdateUserCommand(id, body.name, body.email);
    return this.userService.update(command);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const command = new DeleteUserCommand(id);
    return this.userService.delete(command);
  }
}
