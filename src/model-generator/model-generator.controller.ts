import { FileGenerated } from '../shared/constants';
import { Controller, Post, Body } from '@nestjs/common';
import { ModelGeneratorService } from './model-generator.service';
import { CreateModelDto } from '../shared/models/create-model.dto';

@Controller('model')
export class ModelGeneratorController {
  constructor(private readonly modelGeneratorService: ModelGeneratorService) {}

  @Post()
  public createModel(@Body() createModelDto: CreateModelDto): FileGenerated {
    const code = this.modelGeneratorService.generateModel(createModelDto);
    const path = this.modelGeneratorService.getFilePath(createModelDto.entityName);

    return { code, path };
  }
}
