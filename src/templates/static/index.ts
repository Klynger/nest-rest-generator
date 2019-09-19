import { FileGenerated } from '../../shared/constants';
import { code as mainCode, path as mainPath } from './src/main.ts';
import { code as READMECode, path as READMEPath } from './README.md';
import { code as tslintCode, path as tslintPath } from './tslint.json';
import { code as nodemonCode, path as nodemonPath } from './nodemon.json';
import { code as packageCode, path as packagePath } from './package.json';
import { code as nestCliCode, path as nestCliPath } from './nest-cli.json';
import { code as gitignoreCode, path as gitignorePath } from './gitignore';
import { code as tsconfigCode, path as tsconfigPath } from './tsconfig.json';
import { code as prettierrcCode, path as prettierrcPath } from './prettierrc';
import { code as jestE2ECode, path as jestE2EPath } from './test/jest-e2e.json';
import { code as appE2ESpecCode, path as appE2ESpecPath } from './test/app.e2e-spec.ts';
import { code as nodemonDebugCode, path as nodemonDebugPath } from './nodemon-debug.json';
import { code as tsconfigBuildCode, path as tsconfigBuildPath } from './tsconfig.build.json';

export const staticFiles: FileGenerated[] = [
  {
    code: gitignoreCode,
    path: gitignorePath,
  },
  {
    code: nestCliCode,
    path: nestCliPath,
  },
  {
    code: nodemonDebugCode,
    path: nodemonDebugPath,
  },
  {
    code: nodemonCode,
    path: nodemonPath,
  },
  {
    code: packageCode,
    path: packagePath,
  },
  {
    code: prettierrcCode,
    path: prettierrcPath,
  },
  {
    code: READMECode,
    path: READMEPath,
  },
  {
    code: tsconfigBuildCode,
    path: tsconfigBuildPath,
  },
  {
    code: tsconfigCode,
    path: tsconfigPath,
  },
  {
    code: tslintCode,
    path: tslintPath,
  },
  {
    code: jestE2ECode,
    path: jestE2EPath,
  },
  {
    code: appE2ESpecCode,
    path: appE2ESpecPath,
  },
  {
    code: mainCode,
    path: mainPath,
  },
];
