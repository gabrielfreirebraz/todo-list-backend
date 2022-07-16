import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDTO } from './dtos/create-project.dto';

@Injectable()
export class TodosService {
  constructor(private readonly prismaService: PrismaService) {}

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
}
