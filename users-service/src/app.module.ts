import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/controllers/users.controller';
import { UserService } from './application/services/user.service';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { UserRepositoryImpl } from './infrastructure/persistence/user.repository.impl';

@Module({
  controllers: [UsersController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class AppModule {}
