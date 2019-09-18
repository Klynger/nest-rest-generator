import { Injectable } from '@nestjs/common';
import { Layer } from '../shared/constants';
import { MountLayerParams, mountLayerFile, getDefaultLayerBellow } from '../templates';
import { CreateServiceDto } from '../shared/models/create-service.dto';
import { discoverServiceImports } from '../templates/service.template';

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
}
