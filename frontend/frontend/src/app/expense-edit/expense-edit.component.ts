import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense';
import { ExpenseService } from '../services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.css']
})
export class ExpenseEditComponent implements OnInit {
  expense: Expense | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getExpense();
  }

  getExpense(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading = true;
    this.error = null;
    
    this.expenseService.getExpense(id).subscribe({
      next: (expense) => {
        this.expense = expense;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load expense';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (!this.expense || typeof this.expense.id !== 'number') {
      this.error = 'Invalid expense data';
      return;
    }
    
    this.isLoading = true;
    this.expenseService.updateExpense(this.expense.id, this.expense).subscribe({
      next: () => {
        this.router.navigate(['/expenses', this.expense!.id]); // Non-null assertion is safe here
      },
      error: (err) => {
        this.error = 'Failed to update expense';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}