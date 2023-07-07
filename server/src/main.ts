import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

import * as session from 'express-session';

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

  await app.listen(3000);
}
bootstrap();
