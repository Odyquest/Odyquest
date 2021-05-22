import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChaseComponent } from './modules/pages/chase/chase.component';
import { ListComponent } from './modules/pages/list/list.component';
import { FinishedComponent } from './modules/pages/finished/finished.component';
import { WelcomeComponent } from './modules/pages/welcome/welcome.component';
import { InformationComponent } from './modules/pages/information/information.component';
import { PrivacyComponent } from './modules/pages/privacy/privacy.component';
import { SettingsComponent } from './modules/pages/settings/settings.component';
import { CloseWarningGuard } from 'src/app/core/services/close-warning.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'information', component: InformationComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'list', component: ListComponent },
  { path: 'chase', component: ChaseComponent, canDeactivate: [CloseWarningGuard] },
  { path: 'finished', component: FinishedComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
