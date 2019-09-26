import { pipe } from 'ramda';
import { addIdentationSpacesFn } from '../utils';
import { UpdateAttribute, CreateUpdateDto } from '../shared/models/create-update.dto';

function generateAttribute(attr: UpdateAttribute) {
  const { name, required, type } = attr;
  const requiredCode = required ? '' : '?';

  return `${name}${requiredCode}: ${type};`;
}

export function generateClass(createUpdateDto: CreateUpdateDto, tabSize: number) {
  const { attributes, entityName } = createUpdateDto;
  const generateAttrWithIdentation = pipe(generateAttribute, addIdentationSpacesFn(tabSize));
  const attrs = attributes.map(generateAttrWithIdentation).join('\n');
  const dtoName = `Update${entityName}Dto`;

  if (attributes.length > 0) {
    return `export class ${dtoName} {
${attrs}
}
`;
  }

  return `export class ${dtoName} {}`;
}
