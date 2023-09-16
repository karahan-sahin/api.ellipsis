import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { AnnotationController } from '../annotation/controller/annotation.controller';
import { TaskController } from '../task/task.controller';
import { LoginController } from '../login/login.controller';
import { TaskService } from '../task/task.service';
import { LoginService } from '../login/login.service';
import { AnnotationService } from '../annotation/service/annotation.service';

@Module({
  imports: [],
  controllers: [AppController, AnnotationController, TaskController, LoginController],
  providers: [AppService, TaskService, LoginService, AnnotationService],
})
export class AppModule {}
