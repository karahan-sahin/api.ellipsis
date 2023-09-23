import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { AnnotationController } from '../annotation/controller/annotation.controller';
import { TaskController } from '../task/controllers/task.controller';
import { AuthController } from '../auth/controllers/auth.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TaskService } from '../task/services/task.service';
import { AnnotationService } from '../annotation/service/annotation.service';
import { AuthService } from '../auth/service/auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { MongoDbModule } from './modules/mongodb.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongoDbModule.register(),
  ],
  controllers: [
    AppController, 
    AnnotationController, 
    TaskController,
    AuthController
  ],
  providers: [
    AppService, 
    TaskService, 
    AnnotationService,
    AuthService,
    UsersService
  ],
})
export class AppModule {}
