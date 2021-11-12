import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

(async () => {
  const response = await fetch('assets-shared/configuration/configuration.json');
  const config = await response.json();

  environment['allowedUrls'] = config.api.base_uri;
  environment['issuer'] = config.auth.issuer;
  environment['clientId'] = config.auth.client_id;

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
})();

