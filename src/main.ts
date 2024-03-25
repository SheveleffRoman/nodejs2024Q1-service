import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

export const PORT = Number(process.env.PORT) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Manage your library easily')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT, () => console.log(`Server on port: ${PORT}`));
}
bootstrap();
