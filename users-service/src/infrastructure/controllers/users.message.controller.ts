import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from '../../application/services/user.service';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { UpdateUserCommand } from '../../application/commands/update-user.command';
import { DeleteUserCommand } from '../../application/commands/delete-user.command';

@Controller()
export class UsersMessageController {
  private readonly logger = new Logger(UsersMessageController.name);

  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  async create(command: CreateUserCommand) {
    this.logger.log('Received create_user', JSON.stringify(command));
    return this.userService.create(command);
  }

  @MessagePattern({ cmd: 'find_all_users' })
  async findAll() {
    this.logger.log('Received find_all_users');
    return this.userService.getAll();
  }

  @MessagePattern({ cmd: 'find_user_by_id' })
  async findOne(data: { id: string }) {
    this.logger.log('Received find_user_by_id', JSON.stringify(data));
    return this.userService.getById(data.id);
  }

  @MessagePattern({ cmd: 'update_user' })
  async update(command: UpdateUserCommand) {
    this.logger.log('Received update_user', JSON.stringify(command));
    return this.userService.update(command);
  }

  @MessagePattern({ cmd: 'delete_user' })
  async remove(command: DeleteUserCommand) {
    this.logger.log('Received delete_user', JSON.stringify(command));
    return this.userService.delete(command);
  }
}
