import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
    constructor(private tasksService: TasksService) {}

    @Post()
    create(@Body() dto: CreateTaskDto, @Request() req: any) {
        return this.tasksService.create(dto, req.user.id);
    }

    @Get()
    findAll(@Request() req: any) {
        return this.tasksService.findAll(req.user.id)
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req: any) {
        return this.tasksService.findOne(+id, req.user.id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @Request() req: any) {
        return this.tasksService.update(+id, dto, req.user.id);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req: any) {
        return this.tasksService.remove(+id, req.user.id);
    }
}