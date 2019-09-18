import { Injectable } from '@nestjs/common';

@Injectable()
export class ModuleGeneratorService {
  generateModule() {
    return 'module generated from service';
  }
}
