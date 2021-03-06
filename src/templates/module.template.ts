import { identity, flatten } from 'ramda';
import { capitalize, addSuffix } from '../utils';
import { getIdentation, DEFAULT_INNER_CLASS_TABS } from '.';
import { FileImport, generateImports, LibImport, Import } from './imports.template';
import { CreateModuleDto } from '../shared/models/create-module.dto';
import { Layer, DEFAULT_TAB_SIZE, FileType } from '../shared/constants';

function getImports(entityName: string, fileType: FileType) {
  return (importName: string): FileImport => {
    return {
      fileType,
      moduleImport: true,
      sameFolder: importName === entityName,
      namePascalCase: `${importName}${capitalize(fileType)}`,
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
  const controllersImports = controllers.map(getImports(entityName, FileType.controller));
  const servicesImports = services.map(getImports(entityName, FileType.service));
  const repositoriesImports = repositories.map(getImports(entityName, FileType.repository));
  const modulesImports = modules.map(getImports(entityName, FileType.module));

  const commonImports: LibImport = {
    lib: '@nestjs/common',
    names: ['Module'],
  };

  return flatten<Import[]>([commonImports, controllersImports, servicesImports, repositoriesImports, modulesImports]);
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
      .map(transformFn(FileType.service))
      .concat(repositories.map(transformFn(FileType.repository)))
      .join(', ');
    injectablesCode = `providers: [${injectablesStr}],`;
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
