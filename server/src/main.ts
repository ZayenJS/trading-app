import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: '123456789',
      resave: true,
      saveUninitialized: false,
      name: 'nestsessid',
      // handle store for production
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
  );

  const config = new DocumentBuilder()
    .addServer('http://localhost:3000')
    .setTitle('Trade App API')
    .setDescription('This is the API for the Trade App')
    .setVersion('1.0')
    .addTag('App')
    .addTag('Auth')
    .addTag('Trades')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
