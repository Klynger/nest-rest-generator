import { Module } from '@nestjs/common';
import { CreateGeneratorService } from './create-generator.service';
import { CreateGeneratorController } from './create-generator.controller';

@Module({
  providers: [CreateGeneratorService],
  controllers: [CreateGeneratorController],
})
export class CreateGeneratorModule {}
