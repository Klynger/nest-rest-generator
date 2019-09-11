import * as Yup from 'yup';
import { Layers, Verbs, Verb, Layer } from '../constants';

export class CreateControllerDto {
  implementedMethods: Verb[];
  entityName: string;
  layerBellow?: Layer;
}

export const schema = Yup.object({
  implementedMethods: Yup.array().of(Yup.mixed().oneOf(Object.keys(Verbs))).required(),
  entityName: Yup.string().required(),
  layerBellow: Yup.mixed().oneOf(Object.keys(Layers)),
});
