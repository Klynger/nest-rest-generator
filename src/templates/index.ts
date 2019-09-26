import { generateImports, Import } from './imports.template';
import { fromPascalToKebab, fromPascalToCamel } from '../utils';
import { generateClass as generateServiceClass } from './service.template';
import { Layer, Verb, DEFAULT_TAB_SIZE, FileType } from '../shared/constants';
import { generateClass as generateControllerClass } from './controller.template';
import { generateClass as generateRepositoryClass } from './repository.template';

export const DEFAULT_INNER_CLASS_TABS = 1;

export function getDefaultLayerBellow(layer: Layer): Layer {
  switch (layer) {
    case Layer.controller:
      return Layer.service;
    case Layer.service:
      return Layer.repository;
  }
}

export function generateConstructor(injectables: string[], tabSize: number) {
  const constructorParams = injectables.map(
    (injectable: string) => `private readonly ${fromPascalToCamel(injectable)}: ${injectable}`).join(', ');
  const identationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);

  return `${identationSpaces}constructor(${constructorParams}) {}`;
}

export function getMethodName(verb: Verb, entityName: string) {
  switch (verb) {
    case Verb.GET:
      return `get${entityName}`;
    case Verb.POST:
      return `create${entityName}`;
    case Verb.PUT:
      return `update${entityName}`;
    case Verb.DELETE:
      return `delete${entityName}`;
    default:
      return '';
  }
}

export function getDefaultMethodActionContent(
  layer: Layer,
  entityName: string,
  verb: Verb,
  params: string = '',
  layerBellow?: Layer,
  shouldReturn: boolean = true
) {
  if (typeof layerBellow === 'undefined') {
    return getDefaultMethodActionContent(layer, entityName, verb, params, getDefaultLayerBellow(layer));
  }

  const entityNameCamelCase = fromPascalToCamel(entityName);
  const returnText = `${shouldReturn ? 'return ' : ''}`;

  switch (layerBellow) {
    case Layer.service:
      return `${returnText}this.${entityNameCamelCase}Service.${getMethodName(verb, entityName)}(${params});`;
    case Layer.repository:
      return `${returnText}this.${entityNameCamelCase}Repository.${getMethodName(verb, entityName)}(${params});`;
    default:
      return `${returnText}'default value goes here';`;
  }
}

function getAnnotation(layer: Layer, entityName: string) {
  switch (layer) {
    case Layer.controller:
      return `@Controller('${fromPascalToKebab(entityName)}')`;
    case Layer.service:
      return '@Injectable()';
    case Layer.repository:
      return '@Injectable()';
    default:
      return '';
  }
}

export function getIdentationSpaces(quantSpaces: number) {
  return [...Array(quantSpaces).keys()].map(() => ' ').join('');
}

export function getIdentation(tabSize: number, quantTabs: number) {
  return getIdentationSpaces(quantTabs * tabSize);
}

export function getFilePath(entityName: string, fileType: FileType) {
  const fullKebabEntityName = fromPascalToKebab(entityName);

  if (fileType === FileType.dto) {
    const onlyEntityName = fullKebabEntityName.replace(/^[a-z]+-/, '');
    return `src/shared/models/${onlyEntityName}/${fullKebabEntityName}.${fileType}.ts`;
  } else if (fileType === FileType.model) {
    return `src/shared/models/${fullKebabEntityName}/${fullKebabEntityName}.${fileType}.ts`;
  } else {
    return `src/${fullKebabEntityName}/${fullKebabEntityName}.${fileType}.ts`;
  }
}

export interface MountLayerParams {
  entityName: string;
  layer: Layer;
  layerBellow?: Layer;
  implementedMethods: Verb[];
  injectables: string[];
  tabSize?: number;
  imports: Import[];
}

function getClassCode(params: MountLayerParams) {
  const {
    layer,
    entityName,
    layerBellow,
    injectables,
    implementedMethods,
    tabSize = DEFAULT_TAB_SIZE,
  } = params;

  switch (layer) {
    case Layer.controller:
      return generateControllerClass(entityName, implementedMethods, injectables, tabSize, layerBellow);
    case Layer.service:
      return generateServiceClass(entityName, implementedMethods, injectables, tabSize, layerBellow);
    case Layer.repository:
      return generateRepositoryClass(entityName, implementedMethods, tabSize);
    default:
      return '';
  }
}

export function mountLayerFile(params: MountLayerParams) {
  const { layer, imports, entityName } = params;
  const classCode = getClassCode(params);

  let importsCode = '';

  if (imports.length > 0) {
    importsCode = generateImports(imports) + '\n\n';
  }

  if (imports.length > 0) {
    return `${importsCode}${getAnnotation(layer, entityName)}
${classCode}
`;
  }

  return `${getAnnotation(layer, entityName)}
${classCode}
`;
}
