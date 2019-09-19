import { Controller, Post, Body } from '@nestjs/common';
import { ModuleGeneratorService } from './module-generator.service';
import { CreateModuleDto } from '../shared/models/create-module.dto';
import { FileGenerated } from '../shared/constants';

@Controller('module')
export class ModuleGeneratorController {
  constructor(private readonly moduleGeneratorService: ModuleGeneratorService) {}

  @Post()
  createModule(@Body() createModuleDto: CreateModuleDto): FileGenerated {
    const code = this.moduleGeneratorService.generateModule(createModuleDto);
    const path = this.moduleGeneratorService.getFilePath(createModuleDto.entityName);

    return { code, path };
  }
}
