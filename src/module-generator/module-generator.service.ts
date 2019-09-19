import { getFilePath } from '../templates';
import { Injectable } from '@nestjs/common';
import { FileType } from '../shared/constants';
import { generateClass } from '../templates/module.template';
import { CreateModuleDto } from '../shared/models/create-module.dto';

@Injectable()
export class ModuleGeneratorService {
  generateModule(createModuleDto: CreateModuleDto) {
    return generateClass(createModuleDto);
  }

  getFilePath(entityName: string) {
    return getFilePath(entityName, FileType.module);
  }
}
