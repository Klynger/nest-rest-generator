import { Controller, Post, Body } from '@nestjs/common';
import { CreateGeneratorService } from './create-generator.service';
import { CreateCreateDto } from '../shared/models/create-create.dto';

@Controller('create')
export class CreateGeneratorController {
  constructor(private readonly createGeneratorService: CreateGeneratorService) {}

  @Post()
  generateCreateDto(@Body() createCreateDto: CreateCreateDto) {
    const code = this.createGeneratorService.generateCreateDto(createCreateDto);
    const path = this.createGeneratorService.getFilePath(createCreateDto.entityName);
    return { code, path };
  }
}
