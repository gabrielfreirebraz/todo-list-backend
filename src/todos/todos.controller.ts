import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CreateProjectDTO } from './dtos/create-project.dto';
import { CreateToDoDTO } from './dtos/create-todo.dto';
import { UpdateProjectDTO } from './dtos/update-project.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('/create-project')
  async createProject(@Req() { user }, @Body() { name }: CreateProjectDTO) {
    return await this.todosService.createProject(user.id, name);
  }

  @Put('/update-project/:id')
  async updateProject(
    @Param('id') id: string,
    @Body() { name }: UpdateProjectDTO,
  ) {
    if (!(await this.todosService.findProject(id))) {
      throw new BadRequestException({
        message: 'Project not found',
        type: 'error.projectNotFound',
      });
    }

    return await this.todosService.updateProject(id, name);
  }

  @Delete('/delete-project/:id')
  async deleteProject(@Param('id') id: string) {
    if (!(await this.todosService.findProject(id))) {
      throw new BadRequestException({
        message: 'Project not found',
        type: 'error.projectNotFound',
      });
    }

    await this.todosService.deleteProject(id);

    return {};
  }

  @Get('/projects')
  async findAllProject(@Req() { user }) {
    return await this.todosService.findAllProjects(user.id);
  }

  @Post('/create-todo')
  async createToDo(@Body() { projectId, title }: CreateToDoDTO) {
    if (!(await this.todosService.findProject(projectId))) {
      throw new BadRequestException({
        message: 'Project not found',
        type: 'error.projectNotFound',
      });
    }

    return await this.todosService.createToDo(projectId, title);
  }

  @Delete('/delete-todo/:id')
  async deleteToDo(@Param('id') id: string) {
    if (!(await this.todosService.findToDo(id))) {
      throw new BadRequestException({
        message: 'ToDo not found',
        type: 'error.toDoNotFound',
      });
    }

    await this.todosService.deleteToDo(id);

    return {};
  }
}
