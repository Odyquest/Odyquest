import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChaseComponent } from './chase/chase.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { UrlInputComponent } from './url-input/url-input.component';
import { DescriptionComponent } from './description/description.component';
import { SolutionComponent } from './solution/solution.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChaseListComponent } from './chase-list/chase-list.component';
import { QrcodeInputComponent } from './qrcode-input/qrcode-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ChaseComponent,
    HomeComponent,
    UrlInputComponent,
    DescriptionComponent,
    SolutionComponent,
    WelcomeComponent,
    ChaseListComponent,
    QrcodeInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }