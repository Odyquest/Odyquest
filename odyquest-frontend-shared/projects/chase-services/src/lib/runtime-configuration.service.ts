import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export abstract class AbstractRuntimeConfigurationService {
  public abstract get(): any;
  public abstract isApiBased(): boolean;
  public abstract getTitleText(locale: string): string;
  public abstract getSubtitleText(locale: string): string;
}

@Injectable({
  providedIn: 'root'
})
export class RuntimeConfigurationService implements AbstractRuntimeConfigurationService {
  private config;

  constructor(private http: HttpClient) { }

  load(): Promise<any> {
    return this.http.get('assets-shared/configuration/configuration.json')
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

  getTitleText(locale: string): string {
    return this.config.title['title_text_' + locale];
  }

  getSubtitleText(locale: string): string {
    return this.config.title['subtitle_text_' + locale];
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

