import { getFilePath } from '../templates';
import { Injectable } from '@nestjs/common';
import { generateClass } from '../templates/create.template';
import { DEFAULT_TAB_SIZE, FileType } from '../shared/constants';
import { CreateCreateDto } from '../shared/models/create-create.dto';

@Injectable()
export class CreateGeneratorService {
  generateCreateDto(createCreateDto: CreateCreateDto) {
    return generateClass(createCreateDto, DEFAULT_TAB_SIZE);
  }

  getFilePath(entityName: string) {
    return getFilePath(`Create${entityName}`, FileType.dto);
  }
}
