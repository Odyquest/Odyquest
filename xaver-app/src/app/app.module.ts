import { NarrativeComponent } from './modules/components/narrative/narrative.component';
import { QuestComponent } from './modules/components/quest/quest.component';
import { QrcodeInputComponent } from './modules/components/qrcode-input/qrcode-input.component';
import { ChaseListComponent } from './modules/components/chase-list/chase-list.component';
import { UrlInputComponent } from './modules/components/url-input/url-input.component';
import { SubmitSolutionComponent } from './modules/components/submit-solution/submit-solution.component';
import { HelpComponent } from './modules/components/help/help.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChaseComponent } from './modules/pages/chase/chase.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './modules/pages/home/home.component';


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
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { WelcomeComponent } from './modules/pages/welcome/welcome.component';
import { FinishedComponent } from './modules/pages/finished/finished.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PrivacyComponent } from './modules/pages/privacy/privacy.component';
import { InformationComponent } from './modules/pages/information/information.component';
import { SettingsComponent } from './modules/pages/settings/settings.component';
import { CloseWarningGuard } from './core/services/close-warning.guard';

@NgModule({
  declarations: [
    AppComponent,
    ChaseComponent,
    HelpComponent,
    HomeComponent,
    UrlInputComponent,
    NarrativeComponent,
    ChaseListComponent,
    QrcodeInputComponent,
    QuestComponent,
    SubmitSolutionComponent,
    WelcomeComponent,
    FinishedComponent,
    PrivacyComponent,
    InformationComponent,
    SettingsComponent,
  ],
  entryComponents: [
    SubmitSolutionComponent,
    HelpComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    CloseWarningGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
