import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/controllers/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
