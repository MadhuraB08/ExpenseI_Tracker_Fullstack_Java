import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense';
import { ExpenseService } from '../services/expense.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {
  expense: Expense | undefined;

  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getExpense();
  }

  getExpense(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.expenseService.getExpense(id)
      .subscribe(expense => this.expense = expense);
  }
}