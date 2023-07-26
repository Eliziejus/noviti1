import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanTableComponent } from './loan-table/loan-table.component';

const routes: Routes = [
    { path: '', redirectTo: '/information', pathMatch: 'full' },
    { path: 'information', component: LoanTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }