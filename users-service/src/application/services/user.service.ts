import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { CreateUserCommand } from '../commands/create-user.command';
import { UpdateUserCommand } from '../commands/update-user.command';
import { DeleteUserCommand } from '../commands/delete-user.command';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async create(command: CreateUserCommand): Promise<User> {
    const user = new User(command.name, command.email, command.password);
    return this.userRepository.create(user);
  }

  async update(command: UpdateUserCommand): Promise<User | null> {
    return this.userRepository.update(command.id, {
      name: command.name,
      email: command.email,
    });
  }

  async delete(command: DeleteUserCommand): Promise<boolean> {
    return this.userRepository.delete(command.id);
  }

  async getById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
