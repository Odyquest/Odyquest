import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChaseComponent } from './chase/chase.component';
import { HomeComponent } from './home/home.component';
import { ChaseResolverService } from './services/chase-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'chase', component: ChaseComponent, resolve: {
      chase: ChaseResolverService
    }
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
