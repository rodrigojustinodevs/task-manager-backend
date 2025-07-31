import { Status } from '@prisma/client';
import { Task } from '../entities/task.entity';

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  findAll(
    filter?: {
      title?: string;
      status?: string;
      descript?: string;
      userId: string
    }
  ): Promise<Task[]>;
  findById(id: string, userId: string): Promise<Task | null>;
  update(id: string, userId: string, task: Partial<Task>): Promise<Task>;
  updateStatus(id: string, userId: string, status: string): Promise<Task>;
  delete(id: string, userId: string): Promise<void>;
}
