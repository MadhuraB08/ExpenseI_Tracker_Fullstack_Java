export interface Expense {
    id: number;  // Make id optional with ?
    name: string;
    amount: number;
    category: string;
    description: string;
    createdAt: Date;
  }