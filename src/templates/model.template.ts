import { pipe } from 'ramda';
import { DEFAULT_INNER_CLASS_TABS, getIdentation } from '.';
import { DEFAULT_TAB_SIZE, ImportType } from '../shared/constants';
import { Import, FileImport, generateImports } from './imports.template';
import { CreateModelDto, ModelAttribute, ImportableModelAttribute } from '../shared/models/create-model.dto';

function addIdentationSpaces(tabSize: number) {
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  return (str: string) => `${innerIdentationSpaces}${str}`;
}

export function generateClass(createModelDto: CreateModelDto, imports: Import[], tabSize: number = DEFAULT_TAB_SIZE) {
  const { attributes, entityName }  = createModelDto;

  const generateAttributeWithIdentation = pipe(generateAttribute, addIdentationSpaces(tabSize));
  const attrs = attributes.map(generateAttributeWithIdentation).join('\n');
  const modelName = `${entityName}Model`;
  let importsCode =  '';
  if (imports.length > 0) {
    importsCode = generateImports(imports) + '\n\n';
  }

  if (attributes.length > 0) {
    return `${importsCode}export class ${modelName} {
${attrs}
}
`;
  }

  return `export class ${modelName} {}
`;
}

function isImportable(attr: ModelAttribute) {
  return typeof attr.type !== 'string' && attr.type.importable;
}

// Remove Array if the type is an Array
function transformToEntityName(importableTypeName: string) {
  return importableTypeName.replace(/\[\]/g, '');
}

function transformToImports(entityName: string): FileImport {
  return {
    importType: ImportType.model,
    sameFolder: false,
    namePascalCase: entityName,
  };
}

/**
 * I'm assuming that models can only import models.
 */
export function discoverModelImports(attrs: ModelAttribute[]) {
  return attrs
    .filter(isImportable)
    .map((attr: ImportableModelAttribute) => attr.type.typeName)
    .map(transformToEntityName)
    .map(transformToImports);
}

function generateAttribute(attr: ModelAttribute) {
  const { name, required, type } = attr;

  const requiredCode = required ? '' : '?';
  const typeCode = typeof type === 'string' ? type : type.typeName;
  const attributeCode = `${name}${requiredCode}: ${typeCode};`;

  return attributeCode;
}
