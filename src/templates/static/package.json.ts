export const code = `{
  "name": "",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "license": "",
  "scripts": {
    "build": "rimraf dist && tsc -p tsconfig.build.json",
    "format": "prettier --write \"src/**/*.ts\"",
    "start": "ts-node -r tsconfig-paths/register src/main.ts",
    "start:dev": "tsc-watch -p tsconfig.build.json --onSuccess \"node dist/main.js\"",
    "start:debug": "tsc-watch -p tsconfig.build.json --onSuccess \"node --inspect-brk dist/main.js\"",
    "start:prod": "node dist/main.js",
    "lint": "tslint -p tsconfig.json -c tslint.json",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^6.0.0",
    "@nestjs/core": "^6.0.0",
    "@nestjs/platform-express": "^6.0.0",
    "reflect-metadata": "^0.1.12",
    "rimraf": "^2.6.2",
    "rxjs": "^6.3.3"
  },
  "devDependencies": {
    "@nestjs/testing": "6.1.1",
    "@types/express": "4.16.1",
    "@types/jest": "24.0.11",
    "@types/node": "11.13.4",
    "@types/supertest": "2.0.7",
    "jest": "24.7.1",
    "prettier": "1.17.0",
    "supertest": "4.0.2",
    "ts-jest": "24.0.2",
    "ts-node": "8.1.0",
    "tsc-watch": "2.2.1",
    "tsconfig-paths": "3.8.0",
    "tslint": "5.16.0",
    "typescript": "3.4.3"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
`;

export const path = 'package.json';
