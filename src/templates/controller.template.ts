import { pipe, reduce, flatten } from 'ramda';
import { Layer, Verb, FileType } from '../shared/constants';
import { getKeys, getValues, capitalize } from '../utils';
import { FileImport, LibImport, Import } from './imports.template';
import { generateConstructor, getIdentation, DEFAULT_INNER_CLASS_TABS, getDefaultMethodActionContent } from '.';

function getCommonImportsFromMethod(acc: Record<string, boolean>, cur: Verb) {
  switch (cur) {
    case Verb.GET:
      return {
        ...acc,
        Get: true,
        Param: true,
      };
    case Verb.POST:
      return {
        ...acc,
        Post: true,
        Body: true,
      };
    case Verb.PUT:
      return {
        ...acc,
        Put: true,
        Body: true,
        Param: true,
      };
    case Verb.DELETE:
      return {
        ...acc,
        Delete: true,
        Param: true,
        HttpCode: true,
        HttpStatus: true,
      };
  }
}

function getFileImportsByMethod(entityName: string, layerBellow: Layer) {
  return (acc: Record<string, FileImport>, v: Verb) => {
    const layerBellowImportName = `${entityName}${capitalize(layerBellow)}`;
    const layerBellowImport: FileImport = {
      fileType: layerBellow,
      sameFolder: true,
      namePascalCase: layerBellowImportName,
    };

    switch (v) {
      case Verb.GET:
        return {
          ...acc,
          [layerBellowImportName]: layerBellowImport
        };
      case Verb.POST:
        return {
          ...acc,
          [layerBellowImportName]: layerBellowImport,
          [`Create${entityName}${capitalize(FileType.dto)}`]: {
            fileType: FileType.dto,
            namePascalCase: `Create${entityName}${capitalize(FileType.dto)}`,
            sameFolder: false,
          },
        };
      case Verb.PUT:
        return {
          ...acc,
          [layerBellowImportName]: layerBellowImport,
          [`Update${entityName}${capitalize(FileType.dto)}`]: {
            fileType: FileType.dto,
            namePascalCase: `Update${entityName}${capitalize(FileType.dto)}`,
            sameFolder: false,
          },
        };
      case Verb.DELETE:
        return {
          ...acc,
          [layerBellowImportName]: layerBellowImport,
        };
    }
  };
}

export function discoverControllerImports(entityName: string, implementedMethods: Verb[], layerBellow: Layer): Import[] {
  const names = pipe(reduce(getCommonImportsFromMethod, {}), getKeys)(implementedMethods).concat('Controller');
  const commonImports: LibImport = {
    lib: '@nestjs/common',
    names,
  };
  const fileImports = pipe(reduce(getFileImportsByMethod(entityName, layerBellow), {}), getValues)(implementedMethods);
  return flatten<Import>([commonImports, fileImports]);
}

function generateMethods(implementedMethods: Verb[], entityName: string, tabSize: number, layerBellow?: Layer) {
  return implementedMethods.map((verb: Verb) => generateMethod(verb, entityName, tabSize, layerBellow));
}

export function generateClass(entityName: string, implementedMethods: Verb[], injectables: string[] = [], tabSize: number, layerBellow?: Layer) {
  const hasConstructor = injectables.length > 0;

  if (hasConstructor) {
    return `export class ${entityName}Controller {
${generateConstructor(injectables, tabSize)}

${generateMethods(implementedMethods, entityName, tabSize, layerBellow).join('\n\n')}
}`;
  }

  return `export class ${entityName}Controller {
${generateMethods(implementedMethods, entityName, tabSize, layerBellow)}
}`;
}

function getReturnLine(layer: Layer, entityName: string, verb: Verb, params: string = '', layerBellow?: Layer) {
  return getDefaultMethodActionContent(layer, entityName, verb, params, layerBellow);
}

export function generateMethod(verb: Verb, entityName: string, tabSize: number, layerBellow?: Layer) {
  switch (verb) {
    case Verb.GET:
      return generateGet(entityName, tabSize, layerBellow);
    case Verb.POST:
      return generatePost(entityName, tabSize, layerBellow);
    case Verb.PUT:
      return generatePut(entityName, tabSize, layerBellow);
    case Verb.DELETE:
      return generateDelete(entityName, tabSize, layerBellow);
  }
}

export function generateDelete(entityName: string, tabSize: number, layerBellow?: Layer) {
  const actionLine = getDefaultMethodActionContent(Layer.controller, entityName, Verb.DELETE, 'id', layerBellow, false);
  const outerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  return `${outerIdentationSpaces}@Delete(':id')
${outerIdentationSpaces}@HttpCode(HttpStatus.NO_CONTENT)
${outerIdentationSpaces}delete${entityName}(@Param('id') id: string) {
${innerIdentationSpaces}${actionLine}
${outerIdentationSpaces}}`;
}

export function generatePut(entityName: string, tabSize: number, layerBellow?: Layer) {
  const returnLine = getReturnLine(Layer.controller, entityName, Verb.PUT, `id, update${entityName}Dto`, layerBellow);
  const outerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  return `${outerIdentationSpaces}@Put(':id')
${outerIdentationSpaces}update${entityName}(@Body() update${entityName}Dto: Update${entityName}Dto, @Param('id') id: string) {
${innerIdentationSpaces}${returnLine}
${outerIdentationSpaces}}`;
}

export function generateGet(entityName: string, tabSize: number, layerBellow?: Layer) {
  const returnLine = getReturnLine(Layer.controller, entityName, Verb.GET, 'id', layerBellow);
  const outerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  return `${outerIdentationSpaces}@Get(':id')
${outerIdentationSpaces}get${entityName}(@Param('id') id: string) {
${innerIdentationSpaces}${returnLine}
${outerIdentationSpaces}}`;
}

export function generatePost(entityName: string, tabSize: number, layerBellow?: Layer) {
  const dtoName = `create${entityName}Dto`;
  const returnLine = getReturnLine(Layer.controller, entityName, Verb.POST, dtoName, layerBellow);
  const outerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  return `${outerIdentationSpaces}@Post()
${outerIdentationSpaces}create${entityName}(@Body() ${dtoName}: ${capitalize(dtoName)}) {
${innerIdentationSpaces}${returnLine}
${outerIdentationSpaces}}`;
}
