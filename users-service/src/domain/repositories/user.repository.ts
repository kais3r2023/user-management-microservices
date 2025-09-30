import { User } from '../entities/user.entity';

export interface UserRepository {
  create(user: User): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}

export const USER_REPOSITORY = Symbol('UserRepository');
