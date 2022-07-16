import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';

@Module({
  controllers: [TodosController],
  providers: [TodosService, PrismaService],
})
export class TodosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('todos/*');
  }
}
