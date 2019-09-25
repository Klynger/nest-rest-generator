import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module, HttpModule } from '@nestjs/common';
import { ModelGeneratorModule } from '../model-generator/model-generator.module';
import { CreateGeneratorModule } from '../create-generator/create-generator.module';
import { ModuleGeneratorModule } from '../module-generator/module-generator.module';
import { ServiceGeneratorModule } from '../service-generator/service-generator.module';
import { ControllerGeneratorModule } from '../controller-generator/controller-generator.module';
import { RepositoryGeneratorModule } from '../repository-generator/repository-generator.module';
import { StaticFileGeneratorModule } from '../static-files-generator/static-file-generator.module';

@Module({
  imports: [
    HttpModule,
    ModelGeneratorModule,
    CreateGeneratorModule,
    ModuleGeneratorModule,
    ServiceGeneratorModule,
    RepositoryGeneratorModule,
    ControllerGeneratorModule,
    StaticFileGeneratorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
