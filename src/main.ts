import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // (Optional) Enable CORS if need
  app.enableCors({
    origin: '*',
  });
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('KeyEdu API')
    .setDescription('API for EduNori mobile app')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'accessToken', // <-- this is the name you'll reference in @ApiBearerAuth()
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // http://localhost:3000/api-docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
