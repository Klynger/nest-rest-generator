import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from '../shared/models/create-module.dto';
import { generateClass, discoverModuleImports } from '../templates/module.template';

@Injectable()
export class ModuleGeneratorService {
  generateModule(createModuleDto: CreateModuleDto) {
    return generateClass(createModuleDto);
  }
}
