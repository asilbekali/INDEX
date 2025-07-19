import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle('INDEX example')
    .setDescription('The INDEX API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('INDEX')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    '\n\x1b[42m%s\x1b[0m\x1b[32m %s\x1b[0m\n',
    ' Swagger ',
    `http://localhost:${process.env.PORT ?? 3000}/api 🚀`,
  );
}

bootstrap();
