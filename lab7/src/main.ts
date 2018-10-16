import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 2000;
  app.enableCors();
  await app.listen(port);

  process.on('SIGINT', () => {
    app.close().then(() => console.log('Gracefull shutdown'));
  });
}
bootstrap();
