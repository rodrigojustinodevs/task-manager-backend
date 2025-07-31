import {
  Body,
  Controller,
  Delete,
  Query,
  Get,
  Param,
  Post,
  Put,
  Patch,
  UseGuards
} from '@nestjs/common';
import { TaskService } from '../../application/services/task.service';
import { CreateTaskDto } from '../../application/dto/create-task.dto';
import { UpdateTaskDto } from '../../application/dto/update-task.dto';
import { Task } from '../../domain/entities/task.entity';
import { Status } from 'src/domain/entities/status.enum';
import { CurrentUser } from '../../application/services/auth/current-user.decorator';
import { JwtAuthGuard } from '../../application/services/auth/jwt-auth.guard'


@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @CurrentUser() user: any,
    @Body() dto: CreateTaskDto): Promise<Task> {
      dto.userId = user.userId;
    return this.taskService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @CurrentUser() user: any,
    @Query('searchText') title?: string, 
    @Query('descript') descript?: string,
    @Query('status') status?: string
  ): Promise<Task[]> {
    const { userId } = user;

    return this.taskService.findAll({ 
      title, 
      descript,
      status, 
      userId
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<Task> {
    const { userId } = user.userId;
    return this.taskService.findById(id, userId);
  }
  
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @CurrentUser() user: any,
  ): Promise<Task> {
    dto.userId = user.userId;
    return this.taskService.update(id, dto);
  }

  @Patch(':id/active')
  @UseGuards(JwtAuthGuard)
  async updateStatusActive(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<Task> {
    const { userId } = user.userId;
    return this.taskService.updateStatus(id, Status.active, userId);
  }

  @Patch(':id/inactive')
  @UseGuards(JwtAuthGuard)
  async updateStatusInactive(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<Task> {
    const { userId } = user.userId;
    return this.taskService.updateStatus(id, Status.inactive, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<void> {
    const { userId } = user.userId;
    await this.taskService.delete(id, userId);
  }
}
