import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { MongoDbModule } from 'src/app/modules/mongodb.module';

@Module({
  imports: [
    UsersModule,
    MongoDbModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'SECRET',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}