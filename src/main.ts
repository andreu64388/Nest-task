import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';
const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
      .setTitle('Currency API')
      .setDescription('REST API for currency')
      .setVersion('1.0')
      .addTag('currency')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT, '0.0.0.0');
  } catch (e) {
    console.log(e);
  }
};

start();
