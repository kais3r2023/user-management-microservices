import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  private users: User[] = [];
  private idCounter = 1;

  async create(user: User): Promise<User> {
    user.id = (this.idCounter++).toString();
    this.users.push(user);
    return user;
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;
    Object.assign(user, userData);
    return user;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }
}
