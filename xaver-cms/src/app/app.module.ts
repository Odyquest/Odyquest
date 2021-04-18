import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { Router, RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/ui-elements/sidebar/sidebar.component';
import { ChaseSelectorComponent } from './components/chase-selector/chase-selector.component';
//Angular Material Components
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
import { QuestEditorComponent } from './quest-editor/quest-editor.component'

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';
import { LoggedOutComponent } from './components/logged-out/logged-out.component';

const config = {
  issuer: 'https://dev-379215.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/login/callback',
  clientId: '0oa10p9e5b5UyMNao4x7',
  pkce: true,
  scopes: ['profile']
}

export function onAuthRequired(oktaAuth, injector) {
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

// TODO: add resolver
const appRoutes: Routes = [
  { path: '', component: MainEditorComponent /*, canActivate: [OktaAuthGuard], data: { onAuthRequired }*/ },
  //{ path: '', component: HomeComponent /*, canActivate: [OktaAuthGuard], data: { onAuthRequired }*/ },
  //{ path: 'home', component: HomeComponent /*, canActivate: [OktaAuthGuard], data: { onAuthRequired }*/ },
  //{ path: 'chase', component: MainEditorComponent /*, canActivate: [OktaAuthGuard], data: { onAuthRequired }*/ },
  //{
  //  path: 'login/callback',
  //  component: OktaCallbackComponent
  //},
  //{ path: 'login', component: LoginComponent },
  //{ path: 'logged-out', component: LoggedOutComponent }

]



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
    OktaAuthModule,
    RouterModule.forRoot(
      appRoutes, { enableTracing: true }
    )
  ],
  entryComponents: [
    CreateChaseDialogComponent
  ],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  { provide: MatDialogRef, useValue: {} }, { provide: OKTA_CONFIG, useValue: config }],

  bootstrap: [AppComponent]
})
export class AppModule { }
