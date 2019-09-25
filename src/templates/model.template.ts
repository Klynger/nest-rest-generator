import { pipe } from 'ramda';
import { addIdentationSpacesFn } from '../utils';
import { DEFAULT_TAB_SIZE, FileType } from '../shared/constants';
import { Import, FileImport, generateImports } from './imports.template';
import { CreateModelDto, ModelAttribute, ImportableModelAttribute } from '../shared/models/create-model.dto';

export function generateClass(createModelDto: CreateModelDto, imports: Import[], tabSize: number = DEFAULT_TAB_SIZE) {
  const { attributes, entityName }  = createModelDto;

  const generateAttributeWithIdentation = pipe(generateAttribute, addIdentationSpacesFn(tabSize));
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
    fileType: FileType.model,
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
