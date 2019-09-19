import { Controller, Get } from '@nestjs/common';
import { StaticFileGeneratorService } from './static-file-generator.service';

@Controller('static-file')
export class StaticFileGeneratorController {
  constructor(private readonly staticFileGeneratorService: StaticFileGeneratorService) {}

  @Get()
  getAllStaticFiles() {
    return this.staticFileGeneratorService.getAllStaticFiles();
  }
}
