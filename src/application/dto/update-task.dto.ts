import { IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  descript?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  userId?: string;
}
