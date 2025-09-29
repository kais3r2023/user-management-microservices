import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  private users: any[] = [];

  @MessagePattern({ cmd: 'create-user' })
  createUser(data: any) {
    const newUser = { id: Date.now(), ...data };
    this.users.push(newUser);
    return newUser;
  }

  @MessagePattern({ cmd: 'get-users' })
  getUsers() {
    return this.users;
  }
}
