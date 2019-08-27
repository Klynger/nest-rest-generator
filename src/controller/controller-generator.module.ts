import { Module } from '@nestjs/common';
import { ControllerGenerator } from './controller-generator.controller';
import { ControllerGeneratorService } from './controller-generator.service';

@Module({
  imports: [],
  controllers: [ControllerGenerator],
  providers: [ControllerGeneratorService],
})
export class ControllerGeneratorModule {}
