import { identity, flatten } from 'ramda';
import { FileImport, generateImports } from './imports.template';
import { capitalize, addSuffix } from '../utils';
import { getIdentation, DEFAULT_INNER_CLASS_TABS } from '.';
import { CreateModuleDto } from '../shared/models/create-module.dto';
import { Layer, DEFAULT_TAB_SIZE, ImportType } from '../shared/constants';

function getImports(entityName: string, importType: ImportType) {
  return (importName: string): FileImport => {
    return {
      importType,
      moduleImport: true,
      sameFolder: importName === entityName,
      namePascalCase: `${importName}${capitalize(importType)}`,
    };
  };
}

export function discoverModuleImports(
  entityName: string,
  controllers: string[] = [],
  services: string[] = [],
  repositories: string[] = [],
  modules: string[] = [],
) {
  const controllersImports = controllers.map(getImports(entityName, ImportType.controller));
  const servicesImports = services.map(getImports(entityName, ImportType.service));
  const repositoriesImports = repositories.map(getImports(entityName, ImportType.repository));
  const modulesImports = modules.map(getImports(entityName, ImportType.module));

  return flatten([controllersImports, servicesImports, repositoriesImports, modulesImports]);
}

function generateModuleAnnotation(
  controllers: string[] = [],
  services: string[] = [],
  repositories: string[] = [],
  modules: string[] = [],
  tabSize: number = DEFAULT_TAB_SIZE
) {
  let controllersCode = '';
  let injectablesCode = '';
  let modulesCode = '';
  let innerCode = '';
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS);

  if (controllers.length > 0) {
    const controllersStr = controllers.map(addSuffix(capitalize(Layer.controller))).join(', ');
    controllersCode = `controllers: [${controllersStr}],`;
  }

  if (services.length > 0 || repositories.length > 0) {
    const transformFn = (type: 'service' | 'repository') =>
      (entityName: string) => `${entityName}${capitalize(type)}`;
    const injectablesStr = services
      .map(transformFn(ImportType.service))
      .concat(repositories.map(transformFn(ImportType.repository)))
      .join(', ');
    injectablesCode = `injectables: [${injectablesStr}],`;
  }

  if (modules.length > 0) {
    const modulesStr = modules.map(addSuffix(capitalize(Layer.module))).join(', ');
    modulesCode = `imports: [${modulesStr}],`;
  }

  if (controllersCode || injectablesCode || modulesCode) {
    const code = [controllersCode, injectablesCode, modulesCode]
      .filter(identity)
      .join('\n' + innerIdentationSpaces);
    innerCode = `{
${innerIdentationSpaces}${code}
}`;
  }

  return `@Module(${innerCode})`;
}

export function generateClass(createModuleDto: CreateModuleDto) {
  const {
    modules,
    entityName,
    services,
    controllers,
    repositories,
  } = createModuleDto;

  const imports = discoverModuleImports(entityName, controllers, services, repositories, modules);
  let importsCode = '';
  if (imports.length > 0) {
    importsCode = generateImports(imports) + '\n\n';
  }

  const annotation = generateModuleAnnotation(controllers, services, repositories, modules);
  return `${importsCode}${annotation}
export class ${entityName}${capitalize(Layer.module)} {}
`;
}
