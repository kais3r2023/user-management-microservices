import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_CLIENT_ID ?? 'default-client-id',
            brokers: [process.env.KAFKA_BROKER ?? 'localhost:9092'],
          },
          consumer: {
            groupId: process.env.KAFKA_GROUP_ID ?? 'default-group-id',
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
})
export class AppModule {}
