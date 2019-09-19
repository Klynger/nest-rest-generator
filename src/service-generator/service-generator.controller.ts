import { Controller, Post, Body } from '@nestjs/common';
import { ServiceGeneratorService } from './service-generator.service';
import { CreateServiceDto } from '../shared/models/create-service.dto';
import { FileGenerated } from 'src/shared/constants';

@Controller('service')
export class ServiceGeneratorController {
  constructor(private readonly serviceGeneratorService: ServiceGeneratorService) {}

  @Post()
  public createService(@Body() createServiceDto: CreateServiceDto): FileGenerated {
    const code = this.serviceGeneratorService.generateService(createServiceDto);
    const path = this.serviceGeneratorService.getFilePath(createServiceDto.entityName);
    return { code, path };
  }
}
