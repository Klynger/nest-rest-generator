import { pipe, flatten, reduce } from 'ramda';
import { Verb, FileType } from '../shared/constants';
import { Import, LibImport, FileImport } from './imports.template';
import { fromPascalToCamel, capitalize, getValues } from '../utils';
import { getMethodName, DEFAULT_INNER_CLASS_TABS, getIdentation } from '.';

function generateGet(entityName: string, tabSize: number) {
  const methodName = getMethodName(Verb.GET, entityName);
  const returnLine = `return this._mock[id] || null;`;
  const outerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  return `${outerIdentationSpaces}${methodName}(id: string) {
${innerIdentationSpaces}${returnLine}
${outerIdentationSpaces}}`;
}

function generateCreate(entityName: string, tabSize: number) {
  const methodName = getMethodName(Verb.POST, entityName);
  const camelEntityName = fromPascalToCamel(entityName);
  const dtoName = `create${entityName}Dto`;
  const outerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);
  const innerObj = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 2);

  return `${outerIdentationSpaces}${methodName}(${dtoName}: Create${entityName}Dto) {
${innerIdentationSpaces}const id = this._getNextId();
${innerIdentationSpaces}const ${camelEntityName} = {
${innerObj}...${dtoName},
${innerObj}id,
${innerIdentationSpaces}};
${innerIdentationSpaces}this._mock[id] = ${camelEntityName};
${innerIdentationSpaces}return ${camelEntityName};
${outerIdentationSpaces}}`;
}

function generateUpdate(entityName: string, tabSize: number) {
  const methodName = getMethodName(Verb.PUT, entityName);
  const camelEntityName = fromPascalToCamel(entityName);
  const dtoName = `update${entityName}Dto`;
  const outerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);
  const innerLvl2 = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 2);

  return `${outerIdentationSpaces}${methodName}(id: string, ${dtoName}: Update${entityName}Dto) {
${innerIdentationSpaces}const ${camelEntityName} = this.mock[id];

${innerIdentationSpaces}if (!${camelEntityName}) {
${innerLvl2}return null;
${innerIdentationSpaces}}

${innerIdentationSpaces}this._mock[id] = {
${innerLvl2}...${dtoName},
${innerLvl2}id,
${innerIdentationSpaces}};

${innerIdentationSpaces}return this._mock[id];
${outerIdentationSpaces}}`;
}

function generateDelete(entityName: string, tabSize: number) {
  const methodName = getMethodName(Verb.DELETE, entityName);
  const outerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  return `${outerIdentationSpaces}${methodName}(id: string) {
${innerIdentationSpaces}delete this._mock[id];
${outerIdentationSpaces}}`;
}

function generateGetNextId(entityName: string, tabSize: number) {
  const outerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);
  const className = `${entityName}Repository`;

  return `${outerIdentationSpaces}private _getNextId() {
${innerIdentationSpaces}const availableId = ${className}._idCount.toString();
${innerIdentationSpaces}${className}._idCount++;

${innerIdentationSpaces}return availableId;
${outerIdentationSpaces}}`;
}

function generateMethod(entityName: string, tabSize: number) {
  return (verb: Verb) => {
    switch (verb) {
      case Verb.POST:
        return generateCreate(entityName, tabSize);
      case Verb.GET:
        return generateGet(entityName, tabSize);
      case Verb.PUT:
        return generateUpdate(entityName, tabSize);
      case Verb.DELETE:
        return generateDelete(entityName, tabSize);
      default:
        return '';
    }
  };
}

function generateMethods(entityName: string, implementedMethods: Verb[], tabSize: number) {
  return implementedMethods.map(generateMethod(entityName, tabSize));
}

function getFileImportsByMethod(entityName: string) {
  return (acc: Record<string, FileImport>, cur: Verb) => {
    switch (cur) {
      case Verb.POST:
        return {
          ...acc,
          [`Create${entityName}${capitalize(FileType.dto)}`]: {
            fileType: FileType.dto,
            namePascalCase: `Create${entityName}${capitalize(FileType.dto)}`,
            sameFolder: false,
          },
        };
      case Verb.PUT:
        return {
          ...acc,
          [`Update${entityName}${capitalize(FileType.dto)}`]: {
            fileType: FileType.dto,
            namePascalCase: `Update${entityName}${capitalize(FileType.dto)}`,
            sameFolder: false,
          },
        };
      default:
        return acc;
    }
  };
}

export function discoverImports(entityName: string, implementedMethods: Verb[]): Import[] {
  const commonImports: LibImport = {
    lib: '@nestjs/common',
    names: ['Injectable'],
  };

  const fileImports = pipe(
    reduce(getFileImportsByMethod(entityName), {}),
    getValues,
  )(implementedMethods);

  return flatten<Import>([fileImports, commonImports]);
}

export function generateClass(entityName: string, implementedMethods: Verb[], tabSize: number) {
  let methodsCode = '';
  const innerClassSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerClassLvl2 = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  if (implementedMethods.length > 0) {
    methodsCode = generateMethods(entityName, implementedMethods, tabSize)
      .concat([generateGetNextId(entityName, tabSize)])
      .join('\n\n');
  }

  if (methodsCode) {
    return `export class ${entityName}Repository {
${innerClassSpaces}private static _idCount = 0;
${innerClassSpaces}private static _mock;

${innerClassSpaces}constructor() {
${innerClassLvl2}this._mock = {};
${innerClassSpaces}}

${methodsCode}
}`;
  }
  return `export class ${entityName}Repository {}`;

}
