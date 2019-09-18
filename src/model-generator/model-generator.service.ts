import { Injectable } from '@nestjs/common';

@Injectable()
export class ModelGeneratorService {
  generateModel() {
    return 'model generated from service';
  }
}
