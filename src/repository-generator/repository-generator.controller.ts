import { Post, Controller, Body } from '@nestjs/common';
import { RepositoryGeneratorService } from './repository-generator.service';
import { CreateRepositoryDto } from '../shared/models/create-repository.dto';

@Controller('repository')
export class RepositoryGeneratorController {
  constructor(private readonly repositoryGeneratorService: RepositoryGeneratorService) {}

  @Post()
  createRepository(@Body() createRepositoryDto: CreateRepositoryDto) {
    const code = this.repositoryGeneratorService.generateRepository(createRepositoryDto);
    const path = this.repositoryGeneratorService.getFilePath(createRepositoryDto.entityName);

    return { code, path };
  }
}
