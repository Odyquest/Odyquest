import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChaseComponent } from './modules/pages/chase/chase.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { ChaseResolverService } from './core/services/chase-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'chase', component: ChaseComponent,
  }
];


// resolve: {
//   chase: ChaseResolverService
// }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
