import { Module } from '@nestjs/common';
import { ControllerGeneratorController } from './controller-generator.controller';
import { ControllerGeneratorService } from './controller-generator.service';

@Module({
  imports: [],
  controllers: [ControllerGeneratorController],
  providers: [ControllerGeneratorService],
})
export class ControllerGeneratorModule {}
