import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module, HttpModule } from '@nestjs/common';
import { ModelGeneratorModule } from '../model-generator/model-generator.module';
import { ServiceGeneratorModule } from '../service-generator/service-generator.module';
import { ControllerGeneratorModule } from '../controller-generator/controller-generator.module';

@Module({
  imports: [HttpModule, ControllerGeneratorModule, ServiceGeneratorModule, ModelGeneratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
