import { Verb, Layer } from '../constants';
import { CreateLayerDto } from './create-layer.dto';

export class CreateServiceDto extends CreateLayerDto {
  implementedMethods: Verb[];
  layerBellow?: Layer;
}
