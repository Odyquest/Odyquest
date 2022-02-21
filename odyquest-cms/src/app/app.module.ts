import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import {MarkdownModule } from 'ngx-markdown';
import { OAuthModule, AuthConfig, ValidationHandler, OAuthStorage, OAuthModuleConfig } from 'angular-oauth2-oidc';

import { RuntimeConfigurationService, runtimeInitializerFn } from 'chase-services';
import { ImageModule } from 'chase-services';

import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth/auth.guard.service';
import { ChaseSelectorComponent } from './components/chase-selector/chase-selector.component';
import { HomeComponent } from './components/home/home.component';
import { LoggedOutComponent } from './components/logged-out/logged-out.component';
import { LoginComponent } from './components/login/login.component';
import { MainEditorComponent } from './components/main-editor/main-editor.component';
import { QuestEditorComponent } from './components/quest-editor/quest-editor.component';
import { SidebarComponent } from './components/ui-elements/sidebar/sidebar.component';

import { environment } from '../environments/environment';
import { ElementEditorComponent } from './components/element-editor/element-editor.component';
import { MetaDataEditorComponent } from './components/meta-data-editor/meta-data-editor.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { MediaUploadComponent } from './components/media-upload/media-upload.component';
import { GameElementEditorComponent } from './components/game-element-editor/game-element-editor.component';
import { NarrativeEditorComponent } from './components/narrative-editor/narrative-editor.component';

function getAuthConfig(): AuthConfig {
  const config: AuthConfig = {
    issuer: environment['issuer'],
    clientId: environment['clientId'],
    redirectUri: window.location.origin + '/cms',
    logoutUrl: 'WILL_BE_DONE_LATER',
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
    scope: 'openid profile email',
  };
  config.logoutUrl = `${config.issuer}v2/logout?client_id=${config.clientId}&returnTo=${encodeURIComponent(config.redirectUri)}`;
  return config;
}

function getAuthModuleConfig(): OAuthModuleConfig {
  return {
    // Inject "Authorization: Bearer ..." header for these APIs:
    resourceServer: {
      allowedUrls: [environment['allowedUrls']],
      sendAccessToken: true,
    },
  };
}


// TODO: add resolver
const appRoutes: Routes = [
  { path: 'editor', component: MainEditorComponent, canActivate: [AuthGuard] },
  { path: 'home', component: ChaseSelectorComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{ path: '**', redirectTo: 'home' },
  //{ path: 'logged-out', component: LoggedOutComponent }

];



@NgModule({
  declarations: [
    AppComponent,
    ChaseSelectorComponent,
    HomeComponent,
    LoggedOutComponent,
    LoginComponent,
    MainEditorComponent,
    QuestEditorComponent,
    SidebarComponent,
    ElementEditorComponent,
    MetaDataEditorComponent,
    ImageUploadComponent,
    MediaUploadComponent,
    GameElementEditorComponent,
    NarrativeEditorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ImageModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })
  ],
  entryComponents: [
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    RuntimeConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: runtimeInitializerFn,
      multi: true,
      deps: [RuntimeConfigurationService]
    },
    { provide: MatDialogRef, useValue: {} },
    { provide: OAuthModuleConfig, useFactory: getAuthModuleConfig },
    { provide: ValidationHandler, useClass: JwksValidationHandler },
    { provide: OAuthStorage, useValue: localStorage },
    { provide: AuthConfig, useFactory: getAuthConfig },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
