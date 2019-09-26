import { pipe } from 'ramda';
import { addIdentationSpacesFn } from '../utils';
import { CreateAttribute, CreateCreateDto } from '../shared/models/create-create.dto';

function generateAttribute(attr: CreateAttribute) {
  const { name, required, type } = attr;

  const requiredCode = required ? '' : '?';

  return `${name}${requiredCode}: ${type};`;
}

export function generateClass(createCreateDto: CreateCreateDto, tabSize: number) {
  const { attributes, entityName } = createCreateDto;
  const generateAttrWithIdentation = pipe(generateAttribute, addIdentationSpacesFn(tabSize));
  const attrs = attributes.map(generateAttrWithIdentation).join('\n');
  const dtoName = `Create${entityName}Dto`;

  if (attributes.length > 0) {
    return `export class ${dtoName} {
${attrs}
}
`;
  }

  return `export class ${dtoName} {}
`;
}
