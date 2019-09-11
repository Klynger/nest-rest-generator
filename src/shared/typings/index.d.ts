import { GeneratorStatus } from '../constants';

export {};

declare global {

  enum Methods {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
  }

  interface IGenerator {
    appName: string;
    port: number;
    status: GeneratorStatus;
  }
}
