import { Injectable } from '@nestjs/common';
import { DEFAULT_TAB_SIZE } from '../shared/constants';
import { generateClass } from '../templates/create.template';
import { CreateCreateDto } from '../shared/models/create-create.dto';

@Injectable()
export class CreateGeneratorService {
  generateCreateDto(createCreateDto: CreateCreateDto) {
    return generateClass(createCreateDto, DEFAULT_TAB_SIZE);
  }
}
