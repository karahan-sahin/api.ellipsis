import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongoDbModule } from 'src/app/modules/mongodb.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
