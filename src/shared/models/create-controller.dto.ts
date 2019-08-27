import * as Yup from 'yup';
import { LayersType, Layers, VerbsType, Verbs } from '../constants';

export class CreateControllerDto {
  verbs: keyof VerbsType[];
  entityName: string;
  layerBellow?: keyof LayersType;
}

export const schema = Yup.object({
  verbs: Yup.array().of(Yup.mixed().oneOf(Object.keys(Verbs))).required(),
  entityName: Yup.string().required(),
  layerBellow: Yup.mixed().oneOf(Object.keys(Layers)),
});
