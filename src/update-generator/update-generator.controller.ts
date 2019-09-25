import { Controller, Post, Body } from '@nestjs/common';
import { UpdateGeneratorService } from './update-generator.service';
import { CreateUpdateDto } from '../shared/models/create-update.dto';

@Controller('update')
export class UpdateGeneratorController {
  constructor(private readonly updateGeneratorService: UpdateGeneratorService) {}
  @Post()
  generateUpdate(@Body() createUpdateDto: CreateUpdateDto) {
    const code = this.updateGeneratorService.generateUpdate(createUpdateDto);
    const path = this.updateGeneratorService.getFilePath(createUpdateDto.entityName);
    return { code, path };
  }
}
