import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RuntimeConfigurationService {
  private config;

  constructor(private http: HttpClient) { }

  load() {
    return this.http.get('/assets-shared/configuration/configuration.json')
      .toPromise()
      .then(data => {
        this.config = data;
      });
  }

  get() {
    return this.config;
  }
}

/**
 * loads configuration from assets
 *
 * Only called once in app.module.ts
 */
export const runtimeInitializerFn = (config: RuntimeConfigurationService) => {
  return () => {
    return config.load();
  };
};

