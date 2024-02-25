import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const PORT = process.env.PORT || 4400;

  const config = new DocumentBuilder()
    .setTitle('Юридическая помощь онлайн')
    .setDescription('Веб-приложение для онлайн связи клиентов с юристами')
    .setVersion('0.0.1')
    .addTag('Arseniy Kiselev')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`Сервер запустился на ${PORT} порту`),
  );
}
bootstrap();
