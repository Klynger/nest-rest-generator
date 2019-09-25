import { Verb } from '../constants';
import { CreateLayerDto } from './create-layer.dto';

export class CreateRepositoryDto extends CreateLayerDto {
  implementedMethods: Verb[];
}
