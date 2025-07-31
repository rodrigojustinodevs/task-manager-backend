import { Status } from './../../domain/entities/status.enum';
import { Injectable } from '@nestjs/common';
import { PrismaTaskRepository } from '../../infrastructure/repositories/prisma.task.repository';
import { Task } from '../../domain/entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: PrismaTaskRepository) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, descript, userId } = createTaskDto;

    return this.taskRepository.create({
      title,
      descript,
      userId,
    });
  }

  async findAll(filter?: { 
    title?: string; 
    descript?: string; 
    status?: string; 
    userId: string 
  }): Promise<Task[]> {
    
    return this.taskRepository.findAll(filter);
  }

  async findById(id: string, userId: string,): Promise<Task | null> {
    return this.taskRepository.findById(id, userId);
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    await this.findById(id, dto.userId);
    return this.taskRepository.update(id, dto.userId, dto);
  }

  async updateStatus(id: string, status: Status, userId: string): Promise<Task | null> {
    await this.findById(id, userId);
    return this.taskRepository.updateStatus(id, status, userId);
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.findById(id, userId);
    await this.taskRepository.delete(id, userId);
  }

}
