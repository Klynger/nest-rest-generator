import { Controller, Post } from '@nestjs/common';
import { ModuleGeneratorService } from './module-generator.service';

@Controller('module')
export class ModuleGeneratorController {
  constructor(private readonly moduleGeneratorService: ModuleGeneratorService) {}

  @Post()
  createModule() {
    return this.moduleGeneratorService.generateModule();
  }
}
