import {
  BadRequestException,
  Body,
  Controller,
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

  @Get()
  async findAllProject(@Req() { user }) {
    return await this.todosService.findAllProjects(user.id);
  }
}
