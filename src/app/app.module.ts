import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerGeneratorModule } from '../controller/controller-generator.module';

@Module({
  imports: [HttpModule, ControllerGeneratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
