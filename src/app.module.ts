import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { TaskController } from './presentation/controllers/task.controller';
import { PrismaService } from './infrastructure/database/prisma.service';
import { UserService } from './application/services/user.service';
import { TaskService } from './application/services/task.service';
import { PrismaUserRepository } from './infrastructure/repositories/prisma.user.repository';
import { PrismaTaskRepository } from './infrastructure/repositories/prisma.task.repository';
import { AuthModule } from './application/services/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController, TaskController],
  providers: [
    UserService,
    TaskService,
    PrismaService,
    PrismaUserRepository,
    PrismaTaskRepository,
  ],
  exports: [
    UserService,
    TaskService,
    PrismaUserRepository,
    PrismaTaskRepository,
    PrismaService,
  ],
})
export class AppModule {}
