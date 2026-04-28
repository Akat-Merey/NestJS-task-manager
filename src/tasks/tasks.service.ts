import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto, TaskStatus } from './dto/update-task.dto';

export class Task { 
    id!: number; 
    title!: string;
    description!: string;
    status!: TaskStatus;
    userId!: number;
}

@Injectable()
export class TasksService {
    private tasks: Task[]= [];
    private idCounter = 1;

    create(dto: CreateTaskDto, userId: number): Task {
        const task: Task = {
            id: this.idCounter++,
            title: dto.title,
            description: dto.description,
            status: TaskStatus.PENDING,
            userId,
        };
        this.tasks.push(task);
        return task;
    }

    findAll(userId: number): Task[] {
        return this.tasks.filter((task) => task.userId === userId);
    }

    findOne(id: number, userId: number): Task {
        const task = this.tasks.find((task) => task.id === id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        if (task.userId !== userId) {
            throw new ForbiddenException('This is not your task');
        }
        return task;
    }

    update(id: number, dto: UpdateTaskDto, userId: number): Task {
        const task = this.findOne(id, userId);
        if (dto?.title) task.title = dto.title;
        if (dto?.description) task.description = dto.description;
        if (dto?.status) task.status = dto.status;
        return task;
    }

    remove(id: number, userId: number): { message: string } {
        const task = this.findOne(id, userId);
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
        return { message: 'Task deleted' };
    }
}