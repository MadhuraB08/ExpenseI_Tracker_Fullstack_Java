import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseAddComponent } from './expense-add/expense-add.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/expenses', pathMatch: 'full' },
  { path: 'expenses', component: ExpenseListComponent },
  { path: 'expenses/add', component: ExpenseAddComponent },
  { path: 'expenses/:id', component: ExpenseDetailComponent },
  { path: 'expenses/edit/:id', component: ExpenseEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }