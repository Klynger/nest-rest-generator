import { Subject } from 'rxjs';
import { APP_NAME, GeneratorStatus } from '../shared/constants';
import { Injectable, OnModuleInit, OnModuleDestroy, HttpService } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  private readonly coreUrl: string;
  private readonly port: number;
  private shutdownListener: Subject<void> = new Subject();
  private generator: IGenerator;

  constructor(private readonly http: HttpService) {
    this.coreUrl = process.env.CORE_URL;
    this.port = parseInt(process.env.PORT, 10);
    this.generator = {
      appName: APP_NAME,
      port: this.port,
      status: GeneratorStatus.NORMAL,
    };
  }

  async onModuleInit() {
    await this.http.post<IGenerator>('/generator', this.generator, {
      baseURL: this.coreUrl,
    }).subscribe(null, () => {
      this.shutdownListener.next();
    });
  }

  subscribeToShutdown(shutdownFn: () =>  void): void {
    this.shutdownListener.subscribe(() => shutdownFn());
  }

  onModuleDestroy() {
    return this.http.delete(`/generator/${this.generator.appName}`, {
      baseURL: this.coreUrl,
    }).subscribe();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
