import { User } from '../entities/user.entity';
import { Prisma } from '@prisma/client';

export interface IUserRepository {
  create(userCreateInput: Prisma.UserCreateInput): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
}
