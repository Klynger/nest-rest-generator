import { Module } from '@nestjs/common';
import { StaticFileGeneratorService } from './static-file-generator.service';
import { StaticFileGeneratorController } from './static-file-generator.controller';

@Module({
  controllers: [StaticFileGeneratorController],
  providers: [StaticFileGeneratorService],
})
export class StaticFileGeneratorModule {}
