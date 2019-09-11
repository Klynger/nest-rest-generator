export const APP_NAME = 'nest-rest-generator';
export const DEFAULT_TAB_SIZE = 2;

export enum GeneratorStatus {
  NORMAL = 'NORMAL',
  BUSY = 'BUSY',
}

export interface LayersType {
  service: 'service';
  controller: 'controller';
  module: 'module';
}

export const Layers: LayersType = {
  service: 'service',
  controller: 'controller',
  module: 'module',
};

export enum Layer {
  service = 'service',
  controller = 'controller',
  module = 'module',
}

export enum ImportType {
  service = 'service',
  controller = 'controller',
  module = 'module',
  dto = 'dto',
}

export enum Verb {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface VerbsType {
  POST: 'POST';
  GET: 'GET';
  PUT: 'PUT';
  DELETE: 'DELETE';
}

export const Verbs: VerbsType = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
};