import * as detect from 'detect-port';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppService } from './app/app.service';

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
process.env.PORT = DEFAULT_PORT.toString();
const DEFAULT_CORE_URL = 'http://localhost:3000';

async function run(port: number) {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  const appService = app.get(AppService);
  appService.subscribeToShutdown(app.close);
  await app.listen(port);
}

async function bootstrap() {
  if (!process.env.CORE_URL) {
    process.env.CORE_URL = DEFAULT_CORE_URL;
  }

  await detect(DEFAULT_PORT).then(port => {
    if (port === DEFAULT_PORT) {
      run(port);
      return;
    }

    // tslint:disable-next-line:no-console
    console.log(`Something is running on port ${
      DEFAULT_PORT
    }, running on port ${port}`);

    process.env.PORT = port.toString();
    run(port);
  });
}
bootstrap();
