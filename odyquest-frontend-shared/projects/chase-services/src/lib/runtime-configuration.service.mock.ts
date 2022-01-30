import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractRuntimeConfigurationService } from './runtime-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class RuntimeConfigurationServiceMock implements AbstractRuntimeConfigurationService {
  apiBased = true;

  get(): any {
    return {};
  }

  isApiBased(): boolean {
    return this.apiBased;
  }

  getTitleText(locale: string): string {
    return 'title_text';
  }

  getSubtitleText(locale: string): string {
    return 'subtitle_text';
  }

  getMediaUrlPrefix(): string {
    return 'https://localhost/files/';
  }
}

