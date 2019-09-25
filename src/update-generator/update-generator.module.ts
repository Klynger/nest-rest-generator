import { Module } from '@nestjs/common';
import { UpdateGeneratorService } from './update-generator.service';
import { UpdateGeneratorController } from './update-generator.controller';

@Module({
  controllers: [UpdateGeneratorController],
  providers: [UpdateGeneratorService],
})
export class UpdateGeneratorModule {}
