import * as Yup from 'yup';
import { CreateLayerDto } from './create-layer.dto';
import { Layers, Verbs, Verb, Layer } from '../constants';

export class CreateControllerDto extends CreateLayerDto {
  implementedMethods: Verb[];
  layerBellow?: Layer;
}

export const schema = Yup.object({
  implementedMethods: Yup.array().of(Yup.mixed().oneOf(Object.keys(Verbs))).required(),
  entityName: Yup.string().required(),
  layerBellow: Yup.mixed().oneOf(Object.keys(Layers)),
});
