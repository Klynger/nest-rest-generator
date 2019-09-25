import { pipe, reduce, flatten } from 'ramda';
import { capitalize, getValues } from '../utils';
import { Layer, Verb, FileType } from '../shared/constants';
import { LibImport, Import, FileImport } from './imports.template';
import { generateConstructor, getDefaultMethodActionContent, getIdentation, DEFAULT_INNER_CLASS_TABS } from '.';

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

export function discoverServiceImports(entityName: string, implementedMethods: Verb[], layerBellow: Layer | null): Import[] {
  const commonImports: LibImport = {
    lib: '@nestjs/common',
    names: ['Injectable'],
  };

  const fileImports = pipe(
    reduce(getFileImportsByMethod(entityName), {}),
    getValues
    )(implementedMethods);

  const layerBellowImport: FileImport[] = [];
  if (layerBellow) {
    layerBellowImport.push({
      fileType: layerBellow,
      sameFolder: true,
      namePascalCase: `${entityName}${capitalize(layerBellow)}`,
    });
  }

  return flatten<Import>([commonImports, fileImports, layerBellowImport]);
}

function generateCreate(entityName: string, tabSize: number, layerBellow?: Layer) {
  const dtoName = `create${entityName}Dto`;
  const returnLine = getDefaultMethodActionContent(Layer.service, entityName, Verb.POST, dtoName, layerBellow);
  const outerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  return `${outerIdentationSpaces}create${entityName}(${dtoName}: ${capitalize(dtoName)}) {
${innerIdentationSpaces}${returnLine}
${outerIdentationSpaces}}`;
}

function generateGet(entityName: string, tabSize: number, layerBellow?: Layer) {
  const returnLine = getDefaultMethodActionContent(Layer.service, entityName, Verb.GET, 'id', layerBellow);
  const outerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  return `${outerIdentationSpaces}get${entityName}(id: string) {
${innerIdentationSpaces}${returnLine}
${outerIdentationSpaces}}`;
}

function generateUpdate(entityName: string, tabSize: number, layerBellow?: Layer) {
  const dtoName = `update${entityName}Dto`;
  const params = `id, ${dtoName}`;
  const returnLine = getDefaultMethodActionContent(Layer.service, entityName, Verb.PUT, params, layerBellow);
  const outerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  return `${outerIdentationSpaces}update${entityName}(id: string, ${dtoName}: ${capitalize(dtoName)}) {
${innerIdentationSpaces}${returnLine}
${outerIdentationSpaces}}`;
}

function generateDelete(entityName: string, tabSize: number, layerBellow?: Layer) {
  const actionLine = getDefaultMethodActionContent(Layer.service, entityName, Verb.DELETE, 'id', layerBellow, false);
  const outerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  return `${outerIdentationSpaces}delete${entityName}(id: string) {
${innerIdentationSpaces}${actionLine}
${outerIdentationSpaces}}`;
}

function generateMethod(verb: Verb, entityName: string, tabSize: number, layerBellow: Layer) {
  switch (verb) {
    case Verb.POST:
      return generateCreate(entityName, tabSize, layerBellow);
    case Verb.GET:
      return generateGet(entityName, tabSize, layerBellow);
    case Verb.PUT:
      return generateUpdate(entityName, tabSize, layerBellow);
    case Verb.DELETE:
      return generateDelete(entityName, tabSize, layerBellow);
    default:
      return '';
  }
}

function generateMethods(implementedMethods: Verb[], entityName: string, tabSize: number, layerBellow: Layer) {
  return implementedMethods.map((verb: Verb) => generateMethod(verb, entityName, tabSize, layerBellow));
}

export function generateClass(entityName: string, implementedMethods: Verb[], injectables: string[] = [], tabSize: number, layerBellow?: Layer) {
  const hasContructor = injectables.length > 0;
  const hasMethods = implementedMethods.length > 0;

  let constructorCode = '';
  let methodsCode = '';
  if (hasContructor) {
    constructorCode = generateConstructor(injectables, tabSize) + '\n\n';
  }

  if (hasMethods) {
    methodsCode = generateMethods(implementedMethods, entityName, tabSize, layerBellow).join('\n\n');
  }

  if (hasContructor || hasMethods) {
    return `export class ${entityName}Service {
${constructorCode}${methodsCode}
}`;
  }

  return `export class ${entityName}Service {
${generateMethods(implementedMethods, entityName, tabSize, layerBellow)}
}`;
}
