import { Controller, Post } from '@nestjs/common';
import { ModelGeneratorService } from './model-generator.service';

@Controller('model')
export class ModelGeneratorController {
  constructor(private readonly modelGeneratorService: ModelGeneratorService) {}

  @Post()
  public createModel() {
    return this.modelGeneratorService.generateModel();
  }
}
