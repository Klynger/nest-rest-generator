import { GeneratorStatus } from '../constants';

export enum Methods {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IGenerator {
  appName: string;
  port: number;
  status: GeneratorStatus;
}
