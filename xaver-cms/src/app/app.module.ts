import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent
} from '@okta/okta-angular';
import { Router, RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
//Angular Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChaseSelectorComponent } from './components/chase-selector/chase-selector.component';
import { CreateChaseDialogComponent } from './components/create-chase-dialog/create-chase-dialog.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http'
import { LoggedOutComponent } from './components/logged-out/logged-out.component';
import { LoginComponent } from './components/login/login.component';
import { MainEditorComponent } from './components/main-editor/main-editor.component';
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
import { NgModule } from '@angular/core';
import { QuestEditorComponent } from './quest-editor/quest-editor.component'
import { SidebarComponent } from './components/ui-elements/sidebar/sidebar.component';

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
  { path: 'editor', component: MainEditorComponent /*, canActivate: [OktaAuthGuard], data: { onAuthRequired }*/ },
  { path: '', component: ChaseSelectorComponent /*, canActivate: [OktaAuthGuard], data: { onAuthRequired }*/ },
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
