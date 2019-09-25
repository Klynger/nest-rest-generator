import { pipe } from 'ramda';
import { CreateAttribute, CreateCreateDto } from '../shared/models/create-create.dto';
import { getIdentation, DEFAULT_INNER_CLASS_TABS } from '.';

function addIdentationSpaces(tabSize: number) {
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  return (str: string) => `${innerIdentationSpaces}${str}`;
}
function generateAttribute(attr: CreateAttribute) {
  const { name, required, type } = attr;

  const requiredCode = required ? '' : '?';

  return `${name}${requiredCode}: ${type};`;
}

export function generateClass(createCreateDto: CreateCreateDto, tabSize: number) {
  const { attributes, entityName } = createCreateDto;
  const generateAttrWithIdentation = pipe(generateAttribute, addIdentationSpaces(tabSize));
  const attrs = attributes.map(generateAttrWithIdentation).join('\n');
  const dtoName = `Create${entityName}Dto`;

  if (attributes.length > 0) {
    return `export class ${dtoName} {
${attrs}
}`;
  }

  return `export class ${dtoName} {}
`;
}
