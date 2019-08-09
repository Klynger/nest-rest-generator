import { GeneratorStatus } from '../constants';

export {};

declare global {
  interface IGenerator {
    appName: string;
    port: number;
    status: GeneratorStatus;
  }
}
