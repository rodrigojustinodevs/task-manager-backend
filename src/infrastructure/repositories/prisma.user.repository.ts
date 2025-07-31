import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userCreateInput: Prisma.UserCreateInput): Promise<User> {
    const createdUser = await this.prisma.user.create({ data: userCreateInput });

    // Mapeie para a entidade User para retornar ao domínio
    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
    );
  }
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(
      (user) => new User(user.id, user.name, user.email)
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user
      ? new User(user.id, user.name, user.email)
      : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user
      ? new User(user.id, user.name, user.email, user.password)
      : null;
  }
}
