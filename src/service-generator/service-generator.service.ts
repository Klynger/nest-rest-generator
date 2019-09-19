import { Injectable } from '@nestjs/common';
import { Layer, FileType } from '../shared/constants';
import { CreateServiceDto } from '../shared/models/create-service.dto';
import { discoverServiceImports } from '../templates/service.template';
import { MountLayerParams, mountLayerFile, getDefaultLayerBellow, getFilePath } from '../templates';

@Injectable()
export class ServiceGeneratorService {
  generateService(createServiceDto: CreateServiceDto) {
    const {
      entityName,
      layerBellow = getDefaultLayerBellow(Layer.service),
      implementedMethods,
    } = createServiceDto;

    const imports = discoverServiceImports(entityName, implementedMethods, layerBellow);

    const params: MountLayerParams = {
      ...createServiceDto,
      layer: Layer.service,
      injectables: [],
      imports,
    };

    const fileContent = mountLayerFile(params);
    return fileContent;
  }

  getFilePath(entityName: string) {
    return getFilePath(entityName, FileType.service);
  }
}
