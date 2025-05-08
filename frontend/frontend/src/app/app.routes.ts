import { Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseAddComponent } from './expense-add/expense-add.component';

export const routes: Routes = [
  { path: 'expenses', component: ExpenseListComponent },
  { path: 'expenses/add', component: ExpenseAddComponent },
  { path: '', redirectTo: '/expenses', pathMatch: 'full' }
];