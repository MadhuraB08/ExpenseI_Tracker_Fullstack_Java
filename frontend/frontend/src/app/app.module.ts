import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseAddComponent } from './expense-add/expense-add.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseListComponent,
    ExpenseAddComponent,
    ExpenseDetailComponent,
    ExpenseEditComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }