import { Controller, Post, Body } from '@nestjs/common';
import { ModuleGeneratorService } from './module-generator.service';
import { CreateModuleDto } from '../shared/models/create-module.dto';

@Controller('module')
export class ModuleGeneratorController {
  constructor(private readonly moduleGeneratorService: ModuleGeneratorService) {}

  @Post()
  createModule(@Body() createModuleDto: CreateModuleDto) {
    return this.moduleGeneratorService.generateModule(createModuleDto);
  }
}
