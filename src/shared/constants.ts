export const APP_NAME = 'nest-rest-generator';

export enum GeneratorStatus {
  NORMAL = 'NORMAL',
  BUSY = 'BUSY',
}

export interface LayersType {
  service: 'service';
  controller: 'controller';
}

export const Layers: LayersType = {
  service: 'service',
  controller: 'controller',
};

export interface VerbsType {
  POST: 'POST';
  GET: 'GET';
}

export const Verbs: VerbsType = {
  POST: 'POST',
  GET: 'GET',
};
