import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDTO } from './dtos/create-project.dto';

@Injectable()
export class TodosService {
  constructor(private readonly prismaService: PrismaService) {}

  findProject(id: string) {
    return this.prismaService.projects.findUnique({
      where: {
        id,
      },
    });
  }

  findAllProjects(userId) {
    return this.prismaService.projects.findMany({
      where: {
        userId,
      },
      include: {
        todos: {
          select: {
            project: true,
          },
        },
      },
    });
  }

  createProject(userId: string, name: string) {
    return this.prismaService.projects.create({
      data: {
        name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  createToDo(projectId, title: string) {
    return this.prismaService.todo.create({
      data: {
        title,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });
  }
}
