import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent {
  expenses: Expense[] = [];
  loading = false;

  constructor(private expenseService: ExpenseService) {}

  deleteExpense(id: number) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id).subscribe({
        next: () => {
          this.expenses = this.expenses.filter(expense => expense.id !== id);
        },
        error: (err) => {
          console.error('Failed to delete expense:', err);
        }
      });
    }
  }
}