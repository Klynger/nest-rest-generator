import { GeneratorStatus } from '../constants';

export {};

declare global {

  enum Methods {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
  }

  interface IGenerator {
    appName: string;
    port: number;
    status: GeneratorStatus;
  }
}
