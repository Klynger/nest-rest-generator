import { capitalize } from '../utils';
import { Layer } from '../shared/constants';
import { Injectable } from '@nestjs/common';
import { discoverControllerImports } from '../templates/controller.template';
import { CreateControllerDto } from '../shared/models/create-controller.dto';
import { mountLayerFile, MountLayerParams, getDefaultLayerBellow } from '../templates/index';

@Injectable()
export class ControllerGeneratorService {
  generateController({ entityName, implementedMethods, layerBellow }: CreateControllerDto) {

    if (!layerBellow) {
      layerBellow = getDefaultLayerBellow(Layer.controller);
    }

    const injectable = `${entityName}${capitalize(layerBellow)}`;
    const imports = discoverControllerImports(entityName, implementedMethods, layerBellow);

    const params: MountLayerParams = {
      entityName,
      layer: Layer.controller,
      implementedMethods,
      layerBellow,
      injectables: [injectable],
      imports,
    };
    const fileContent = mountLayerFile(params);
    return fileContent;
  }
}
