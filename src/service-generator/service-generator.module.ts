import { Module } from '@nestjs/common';
import { ServiceGeneratorController } from './service-generator.controller';
import { ServiceGeneratorService } from './service-generator.service';

@Module({
  controllers: [ServiceGeneratorController],
  providers: [ServiceGeneratorService],
})
export class ServiceGeneratorModule {}
