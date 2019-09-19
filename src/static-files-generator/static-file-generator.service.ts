import { Injectable } from '@nestjs/common';

@Injectable()
export class StaticFileGeneratorService {
  getAllStaticFiles() {
    return 'all static files from service';
  }
}
