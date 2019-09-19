import { getFilePath } from '../templates';
import { Injectable } from '@nestjs/common';
import { FileType } from '../shared/constants';
import { CreateModelDto } from '../shared/models/create-model.dto';
import { generateClass, discoverModelImports } from '../templates/model.template';

@Injectable()
export class ModelGeneratorService {
  generateModel(createModelDto: CreateModelDto) {
    const modelsImports = discoverModelImports(createModelDto.attributes);
    return generateClass(createModelDto, modelsImports);
  }

  getFilePath(entityName: string) {
    return getFilePath(entityName, FileType.module);
  }
}
