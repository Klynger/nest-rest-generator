import { Injectable } from '@nestjs/common';
import { staticFiles } from '../templates/static';

@Injectable()
export class StaticFileGeneratorService {
  getAllStaticFiles() {
    return staticFiles;
  }
}
