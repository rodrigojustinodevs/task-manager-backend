import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { Prisma } from '@prisma/client';
import { Task } from './../../domain/entities/task.entity';
import { Status } from './../../domain/entities/status.enum';

@Injectable()
export class PrismaTaskRepository implements ITaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(taskCreateInput: Prisma.TaskUncheckedCreateInput): Promise<Task> {

    const createdTask = await this.prisma.task.create({ data: taskCreateInput });

    return new Task(
      createdTask.id,
      createdTask.title,
      createdTask.descript,
      createdTask.userId
    );
  }

  async findAll(filter?: { 
    title?: string; 
    descript?: string;
    status?: string; 
    userId: string 
  }): Promise<Task[]> {
    const whereClause: any = {
      userId: filter?.userId,
    };
  
    if (filter?.title) {
      whereClause.title = {
        contains: filter.title.toLowerCase(),
      };
    }

    if (filter?.descript) {
      whereClause.descript = {
        contains: filter.descript.toLowerCase(),
      };
    }
  
    if (filter?.status) {
      whereClause.status = filter.status;
    }
  
    const tasks = await this.prisma.task.findMany({
      where: whereClause,
    });
  
    return tasks.map(
      (task) => new Task(task.id, task.title, task.descript, task.userId, task.status)
    );
  }

  async findById(id: string, userId: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({ where: { id, userId } });

    return task
      ? new Task(task.id, task.title, task.descript, task.userId, task.status)
      : null;
  }

  async update(
    id: string,
    userId: string,
    task: Partial<Task>
  ): Promise<Task> {
    const taskUpdateInput: Prisma.TaskUpdateInput = {
      title: task.title,
      descript: task.descript,
      status: task.status,
    };

    const updatedTask = await this.prisma.task.update({
      where: { id, userId },
      data: taskUpdateInput,
    });

    return new Task(
      updatedTask.id,
      updatedTask.title,
      updatedTask.descript,
      updatedTask.userId,
    );
  }

  async updateStatus(
      id: string,
      userId: string,
      status: string,
    ): Promise<Task | null> {

    const taskUpdateInput: Prisma.TaskUpdateInput = {
      status: status === Status.active
      ? Status.active
      : Status.inactive,
    };

    const updatedTask = await this.prisma.task.update({
      where: { id, userId },
      data: taskUpdateInput,
    });

    return new Task(
      updatedTask.id,
      updatedTask.title,
      updatedTask.descript,
      updatedTask.userId,
      updatedTask.status
    );
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.prisma.task.delete({ where: { id, userId } });
  }
}
