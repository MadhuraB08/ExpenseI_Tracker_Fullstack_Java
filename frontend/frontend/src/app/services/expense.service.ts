import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap, finalize } from 'rxjs';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:8080/api/expenses';
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Get all expenses with caching
  private cachedExpenses: Expense[] | null = null;
  
  getExpenses(refresh: boolean = false): Observable<Expense[]> {
    if (this.cachedExpenses && !refresh) {
      return new Observable<Expense[]>(observer => {
        observer.next(this.cachedExpenses!);
        observer.complete();
      });
    }

    this.loadingSubject.next(true);
    return this.http.get<Expense[]>(this.apiUrl).pipe(
      tap(expenses => this.cachedExpenses = expenses),
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  // Get single expense
  getExpense(id: number): Observable<Expense> {
    this.loadingSubject.next(true);
    return this.http.get<Expense>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  // Add new expense
  addExpense(expense: Omit<Expense, 'id'>): Observable<Expense> {
    console.log('Sending to server:', expense); // Debug log
    return this.http.post<Expense>(this.apiUrl, expense).pipe(
      catchError(error => {
        console.error('Server error:', error);
        return throwError(() => new Error('Failed to add expense'));
      })
    );
  }

  // Update existing expense
  updateExpense(id: number, expense: Expense): Observable<Expense> {
    this.loadingSubject.next(true);
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense).pipe(
      tap(updatedExpense => {
        if (this.cachedExpenses) {
          const index = this.cachedExpenses.findIndex(e => e.id === id);
          if (index !== -1) {
            this.cachedExpenses[index] = updatedExpense;
          }
        }
      }),
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  // Delete expense
  deleteExpense(id: number): Observable<void> {
    this.loadingSubject.next(true);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        if (this.cachedExpenses) {
          this.cachedExpenses = this.cachedExpenses.filter(e => e.id !== id);
        }
      }),
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  // Get expenses by category
  getExpensesByCategory(category: string): Observable<Expense[]> {
    this.loadingSubject.next(true);
    return this.http.get<Expense[]>(`${this.apiUrl}/category/${category}`).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Clear cache
  clearCache() {
    this.cachedExpenses = null;
  }
}