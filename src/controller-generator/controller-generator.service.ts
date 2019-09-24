import { capitalize } from '../utils';
import { Injectable } from '@nestjs/common';
import { Layer, FileType } from '../shared/constants';
import { discoverControllerImports } from '../templates/controller.template';
import { CreateControllerDto } from '../shared/models/create-controller.dto';
import { mountLayerFile, MountLayerParams, getDefaultLayerBellow, getFilePath } from '../templates/index';

@Injectable()
export class ControllerGeneratorService {
  generateController({ entityName, implementedMethods, layerBellow }: CreateControllerDto) {

    if (typeof layerBellow === 'undefined') {
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

  getFilePath(entityName: string) {
    return getFilePath(entityName, FileType.controller);
  }
}
