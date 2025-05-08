import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Expense } from '../models/expense';

@Component({
  selector: 'app-expense-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.css']
})
export class ExpenseAddComponent {
  expense: Omit<Expense, 'id'> = {
    name: '',
    amount: 0,
    category: '',
    description: '',
    createdAt: new Date()
  };

  constructor(
    private expenseService: ExpenseService,
    private router: Router
  ) {}

  onSubmit() {
    console.log('Submitting expense:', this.expense); // Debug log
    this.expenseService.addExpense(this.expense).subscribe({
      next: (newExpense) => {
        console.log('Expense added:', newExpense); // Debug log
        this.router.navigate(['/expenses']);
      },
      error: (err) => {
        console.error('Error adding expense:', err);
        alert('Failed to add expense. Please try again.'); // User feedback
      }
    });
  }
}