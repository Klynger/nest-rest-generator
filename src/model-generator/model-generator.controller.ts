import { Controller, Post, Body } from '@nestjs/common';
import { ModelGeneratorService } from './model-generator.service';
import { CreateModelDto } from '../shared/models/create-model.dto';

@Controller('model')
export class ModelGeneratorController {
  constructor(private readonly modelGeneratorService: ModelGeneratorService) {}

  @Post()
  public createModel(@Body() createModelDto: CreateModelDto) {
    return this.modelGeneratorService.generateModel(createModelDto);
  }
}
