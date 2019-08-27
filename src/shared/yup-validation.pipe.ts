import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { Schema } from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private readonly schema: Schema<any>) {}

  transform(input: any, _: ArgumentMetadata) {
    this.schema.validateSync(input);

    return input;
  }
}
