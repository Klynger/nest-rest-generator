import { Injectable } from '@nestjs/common';
import { Layer, FileType } from '../shared/constants';
import { mountLayerFile, getFilePath } from '../templates';
import { discoverImports } from '../templates/repository.template';
import { CreateRepositoryDto } from '../shared/models/create-repository.dto';

@Injectable()
export class RepositoryGeneratorService {
  generateRepository(createRepositoryDto: CreateRepositoryDto) {
    const { entityName, implementedMethods } = createRepositoryDto;

    return mountLayerFile({
      entityName,
      implementedMethods,
      layer: Layer.repository,
      injectables: [],
      imports: discoverImports(entityName, implementedMethods),
    });
  }

  getFilePath(entityName: string) {
    return getFilePath(entityName, FileType.repository);
  }
}
