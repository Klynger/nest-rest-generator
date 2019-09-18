// import { Layer } from '../shared/constants';
import { fromPascalToKebab, capitalize } from '../utils';
import { ImportType, Layer } from '../shared/constants';

// export function generateImport(fileName: string, type: Layer, sameFolder: boolean) {
//   const prefix = sameFolder ? `./${fileName}` : `../${fileName}/${fileName}`;
//   switch (type) {
//     case Layer.controller:
//       return `${prefix}.controller`;
//     case Layer.service:
//       return  `${prefix}.service`;
//     case Layer.module:
//       return `${prefix}.module`;
//     default:
//       return '';
//   }
// }

// tslint:disable-next-line: no-empty-interface
export interface Import {}

export interface FileImport extends Import {
  sameFolder?: boolean;
  importType: ImportType | Layer;
  namePascalCase: string;
}

export interface LibImport extends Import {
  names: string[];
  lib: string;
}

function generateFileImport({ namePascalCase, importType, sameFolder }: FileImport) {
  // remove import type from name
  const entityName = namePascalCase.replace(/[A-Z][a-z]+$/, '');
  const nameKebabCase = fromPascalToKebab(entityName);

  if (sameFolder) {
    return `import { ${namePascalCase} } from './${nameKebabCase}.${importType}';`;

  } else if (importType === ImportType.dto) {
    const dtoPrefixRegex = /([a-z]+)-/;
    const entityNameKebab = nameKebabCase.replace(dtoPrefixRegex, '');
    return `import { ${namePascalCase} } from '../shared/models/${entityNameKebab}/${nameKebabCase}.${importType}';`;

  }
  return `import { ${namePascalCase} } from '../${nameKebabCase}/${nameKebabCase}.${importType}';`;
}

function generateLibImport({ lib, names }: LibImport) {
  return `import { ${names.join(', ')} } from '${lib}';`;
}

export function generateImport(imp: Import) {
  return 'lib' in imp ? generateLibImport(imp) : generateFileImport(imp as FileImport);
}

export function generateImports(imports: Import[]) {
  return imports.map(generateImport).join('\n');
}
