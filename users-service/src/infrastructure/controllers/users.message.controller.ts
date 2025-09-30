import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from '../../application/services/user.service';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { UpdateUserCommand } from '../../application/commands/update-user.command';
import { DeleteUserCommand } from '../../application/commands/delete-user.command';

@Controller()
export class UsersMessageController {
  private readonly logger = new Logger(UsersMessageController.name);

  constructor(private readonly userService: UserService) {}

  @MessagePattern('create_user')
  async create(@Payload() message: { value: CreateUserCommand }) {
    this.logger.log(`Received create_user: ${JSON.stringify(message.value)}`);
    return this.userService.create(message.value);
  }

  @MessagePattern('find_all_users')
  async findAll() {
    this.logger.log('Received find_all_users');
    return this.userService.getAll();
  }

  @MessagePattern('find_user_by_id')
  async findOne(@Payload() message: { value: { id: string } }) {
    this.logger.log(
      `Received find_user_by_id: ${JSON.stringify(message.value)}`,
    );
    return this.userService.getById(message.value.id);
  }

  @MessagePattern('update_user')
  async update(@Payload() message: { value: UpdateUserCommand }) {
    this.logger.log(`Received update_user: ${JSON.stringify(message.value)}`);
    return this.userService.update(message.value);
  }

  @MessagePattern('delete_user')
  async remove(@Payload() message: { value: DeleteUserCommand }) {
    this.logger.log(`Received delete_user: ${JSON.stringify(message.value)}`);
    return this.userService.delete(message.value);
  }
}
