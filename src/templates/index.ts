import { generateImports, Import } from './imports.template';
import { fromPascalToKebab, fromPascalToCamel } from '../utils';
import { Layer, Verb, DEFAULT_TAB_SIZE } from '../shared/constants';
import { generateClass as generateControllerClass } from './controller.template';

export const DEFAULT_INNER_CLASS_TABS = 1;

export function getDefaultLayerBellow(layer: Layer): Layer {
  switch (layer) {
    case Layer.controller:
      return Layer.service;
  }
}

export function generateConstructor(injectables: string[], tabSize: number) {
  const constructorParams = injectables.map(
    (injectable: string) => `private readonly ${fromPascalToCamel(injectable)}: ${injectable}`).join(', ');
  const identationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);

  return `${identationSpaces}constructor(${constructorParams}) {}`;
}

function getAnnotation(layer: Layer, entityName: string) {
  switch (layer) {
    case Layer.controller:
      return `@Controller('${fromPascalToKebab(entityName)}')`;
    case Layer.service:
      return '@Injectable()';
    case Layer.module:
      return '@Module()';
  }
}

export function getIdentationSpaces(quantSpaces: number) {
  return [...Array(quantSpaces).keys()].map(() => ' ').join('');
}

export function getIdentation(tabSize: number, quantTabs: number) {
  return getIdentationSpaces(quantTabs * tabSize);
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

function discoverImports() {

}

export function mountLayerFile(params: MountLayerParams) {
  const {
    layer,
    entityName,
    imports,
    layerBellow,
    injectables,
    implementedMethods,
    tabSize = DEFAULT_TAB_SIZE,
  } = params;

  if (imports.length > 0) {
    return `${generateImports(imports)}

${getAnnotation(layer, entityName)}
${generateControllerClass(entityName, implementedMethods, injectables, tabSize, layerBellow)}
`;
  }

  return `${getAnnotation(layer, entityName)}
${generateControllerClass(entityName, implementedMethods, injectables, tabSize, layerBellow)}
`;
}
