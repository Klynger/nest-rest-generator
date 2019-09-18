import { Verb, Layer } from '../constants';

export class CreateServiceDto {
  implementedMethods: Verb[];
entityName: string;
layerBellow?: Layer;
}
