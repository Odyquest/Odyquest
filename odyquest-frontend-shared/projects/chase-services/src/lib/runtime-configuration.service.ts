import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RuntimeConfigurationService {
  private config;

  constructor(private http: HttpClient) { }

  load(): Promise<any> {
    return this.http.get('/assets-shared/configuration/configuration.json')
      .toPromise()
      .then(data => {
        this.config = data;
      });
  }

  get(): any {
    return this.config;
  }

  isApiBased(): boolean {
    return this.config.api.api_based;
  }
}

/**
 * loads configuration from assets
 *
 * Only called once in app.module.ts
 */
export const runtimeInitializerFn = (service: RuntimeConfigurationService) => {
  return () => {
    return service.load();
  };
};

