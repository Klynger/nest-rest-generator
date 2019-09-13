import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module, HttpModule } from '@nestjs/common';
import { ControllerGeneratorModule } from '../controller-generator/controller-generator.module';

@Module({
  imports: [HttpModule, ControllerGeneratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
