import { fromPascalToCamel } from '../utils';
import { Layer, Verb, ImportType } from '../shared/constants';
import { pipe, map, flatten } from 'ramda';
import { generateConstructor, getDefaultLayerBellow, getIdentation, DEFAULT_INNER_CLASS_TABS } from './index';
import { FileImport, LibImport, Import } from './imports.template';

function getFileImportsByMethod(entityName: string, layerBellow: Layer) {
  return (v: Verb) => {
    const layerBellowImport: FileImport = {
      importType: layerBellow,
      sameFolder: true,
      namePascalCase: entityName,
    };
  
    switch (v) {
      case Verb.GET:
        return [layerBellowImport];
      case Verb.POST:
        return [layerBellowImport, {
          importType: ImportType.dto,
          namePascalCase: `Create${entityName}`,
          sameFolder: false,
        }];
    }
  };
}

function getCommonImportsFromMethod(v: Verb) {
  switch (v) {
    case Verb.GET:
      return ['Get', 'Param'];
    case Verb.POST:
      return ['Post', 'Body'];
  }
}

export function discoverControllerImports(entityName: string, implementedMethods: Verb[], layerBellow: Layer): Import[] {
  const names = pipe(map(getCommonImportsFromMethod), flatten)(implementedMethods).concat('Controller');
  const commonImports: LibImport = {
    lib: '@nestjs/common',
    names,
  };
  const fileImports = implementedMethods.map(getFileImportsByMethod(entityName, layerBellow));
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

function getMethodName(verb: Verb, entityName: string) {
  switch (verb) {
    case Verb.GET:
      return `get${entityName}`;
    case Verb.POST:
      return `create${entityName}`;
    default:
      return '';
  }
}

function getReturnLine(layer: Layer, entityName: string, verb: Verb, params: string = '', layerBellow?: Layer) {
  if (!layerBellow) {
    return getReturnLine(layer, entityName, verb, params, getDefaultLayerBellow(layer));
  }
  const entityNameCamelCase = fromPascalToCamel(entityName);
  switch (layerBellow) {
    case Layer.service:
      return `return this.${entityNameCamelCase}Service.${getMethodName(verb, entityName)}(${params});`;
    default:
      return `return 'default value goes here';`;
  }
}

export function generateMethod(verb: Verb, entityName: string, tabSize: number, layerBellow?: Layer) {
  switch (verb) {
    case Verb.GET:
      return generateGet(entityName, tabSize, layerBellow);
    case Verb.POST:
      return generatePost(entityName, tabSize, layerBellow);
  }
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
  const returnLine = getReturnLine(Layer.controller, entityName, Verb.POST, 'id', layerBellow);
  const outerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  return `${outerIdentationSpaces}@Post()
${outerIdentationSpaces}create${entityName}(@Body() create${entityName}Dto: Create${entityName}Dto) {
${innerIdentationSpaces}${returnLine}
${outerIdentationSpaces}}`;
}
