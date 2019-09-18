import { Injectable } from '@nestjs/common';
import { DEFAULT_TAB_SIZE } from '../shared/constants';
import { generateClass, discoverModelImports } from '../templates/model.template';
import { CreateModelDto } from '../shared/models/create-model.dto';

@Injectable()
export class ModelGeneratorService {
  generateModel(createModelDto: CreateModelDto) {
    const modelsImports = discoverModelImports(createModelDto.attributes);
    return generateClass(createModelDto, modelsImports);
  }
}
