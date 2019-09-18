import { Controller, Post, Body } from '@nestjs/common';
import { ServiceGeneratorService } from './service-generator.service';
import { CreateServiceDto } from '../shared/models/create-service.dto';

@Controller('service')
export class ServiceGeneratorController {
  constructor(private readonly serviceGeneratorService: ServiceGeneratorService) {}

  @Post()
  public createService(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceGeneratorService.generateService(createServiceDto);
  }
}
