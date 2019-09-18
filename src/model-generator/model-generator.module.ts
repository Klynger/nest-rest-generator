import { Module } from '@nestjs/common';
import { ModelGeneratorController } from './model-generator.controller';
import { ModelGeneratorService } from './model-generator.service';

@Module({
  controllers: [ModelGeneratorController],
  providers: [ModelGeneratorService],
})
export class ModelGeneratorModule {}
