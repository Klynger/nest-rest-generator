import { Module } from '@nestjs/common';
import { ModuleGeneratorService } from './module-generator.service';
import { ModuleGeneratorController } from './module-generator.controller';

@Module({
  controllers: [ModuleGeneratorController],
  providers: [ModuleGeneratorService],
})
export class ModuleGeneratorModule {}
