import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const kafkaClientId = process.env.KAFKA_CLIENT_ID ?? '';
  const kafkaBroker = process.env.KAFKA_BROKER ?? '';
  const kafkaGroupId = process.env.KAFKA_GROUP_ID ?? '';

  if (!kafkaClientId || !kafkaBroker || !kafkaGroupId) {
    throw new Error(
      'KAFKA_CLIENT_ID, KAFKA_BROKER, and KAFKA_GROUP_ID must be defined in environment variables.',
    );
  }

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: kafkaClientId,
        brokers: [kafkaBroker],
      },
      consumer: {
        groupId: 'api-gateway-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
