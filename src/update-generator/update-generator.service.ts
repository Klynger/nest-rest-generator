import { getFilePath } from '../templates';
import { Injectable } from '@nestjs/common';
import { generateClass } from '../templates/update.template';
import { DEFAULT_TAB_SIZE, FileType } from '../shared/constants';
import { CreateUpdateDto } from '../shared/models/create-update.dto';

@Injectable()
export class UpdateGeneratorService {
  generateUpdate(createUpdateDto: CreateUpdateDto) {
    return generateClass(createUpdateDto, DEFAULT_TAB_SIZE);
  }

  getFilePath(entityName: string) {
    return getFilePath(`Update${entityName}`, FileType.dto);
  }
}
