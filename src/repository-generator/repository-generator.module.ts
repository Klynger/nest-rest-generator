import { Module } from '@nestjs/common';
import { RepositoryGeneratorService } from './repository-generator.service';
import { RepositoryGeneratorController } from './repository-generator.controller';

@Module({
  controllers: [RepositoryGeneratorController],
  providers: [RepositoryGeneratorService],
})
export class RepositoryGeneratorModule {}
