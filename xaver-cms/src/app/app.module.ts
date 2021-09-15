import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/ui-elements/sidebar/sidebar.component';
import { ChaseSelectorComponent } from './components/chase-selector/chase-selector.component';
import { RuntimeConfigurationService, runtimeInitializerFn } from './shared/services/runtime-configuration.service';
// Angular Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator'; import { CreateChaseDialogComponent } from './components/create-chase-dialog/create-chase-dialog.component';
import { MainEditorComponent } from './components/main-editor/main-editor.component';
import { QuestEditorComponent } from './quest-editor/quest-editor.component';

// import { OAuthModule } from 'angular-oauth2-oidc';
import { OAuthModule, AuthConfig, ValidationHandler, OAuthStorage, OAuthModuleConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { AuthGuard } from './services/auth/auth.guard.service';
import { LoggedOutComponent } from './components/logged-out/logged-out.component';


// Could also go to its own file, but we just dump it next to the AppModule.
const config: AuthConfig = {
  issuer: 'https://cms.schnitzeljagd.landesmuseum.de/auth/realms/master',
  clientId: 'test-cms',
  redirectUri: window.location.origin + '/cms',
  logoutUrl: 'WILL_BE_DONE_LATER',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'openid profile email',
};

// Could also go to its own file, but we just dump it next to the AppModule.
const authModuleConfig: OAuthModuleConfig = {
  // Inject "Authorization: Bearer ..." header for these APIs:
  resourceServer: {
    allowedUrls: ['http://localhost:8400/chase', 'http://localhost:8444/chase'],
    sendAccessToken: true,
  },
};

config.logoutUrl = `${config.issuer}v2/logout?client_id=${config.clientId}&returnTo=${encodeURIComponent(config.redirectUri)}`;

// TODO: add resolver
const appRoutes: Routes = [
  { path: 'editor', component: MainEditorComponent, canActivate: [AuthGuard] },
  { path: 'home', component: ChaseSelectorComponent/*, canActivate: [AuthGuard]*/ },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{ path: '**', redirectTo: 'home' },
  //{ path: 'logged-out', component: LoggedOutComponent }

];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    ChaseSelectorComponent,
    CreateChaseDialogComponent,
    MainEditorComponent,
    QuestEditorComponent,
    LoggedOutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  entryComponents: [
    CreateChaseDialogComponent
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
    { provide: OAuthModuleConfig, useValue: authModuleConfig },
    { provide: ValidationHandler, useClass: JwksValidationHandler },
    { provide: OAuthStorage, useValue: localStorage },
    { provide: AuthConfig, useValue: config },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
