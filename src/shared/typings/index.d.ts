import { GeneratorStatus } from '../constants';

export {};

declare global {

  enum Layers {
    POST = 'POST',
    GET = 'GET',
  }

  interface IGenerator {
    appName: string;
    port: number;
    status: GeneratorStatus;
  }
}
