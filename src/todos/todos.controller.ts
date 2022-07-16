import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateProjectDTO } from './dtos/create-project.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('/create-project')
  async createProject(@Req() { user }, @Body() { name }: CreateProjectDTO) {
    return await this.todosService.createProject(user.id, name);
  }
}
