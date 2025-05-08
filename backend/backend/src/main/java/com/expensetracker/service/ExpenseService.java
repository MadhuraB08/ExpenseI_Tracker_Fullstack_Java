package com.expensetracker.service;

import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    
    public ExpenseService(ExpenseRepository expenseRepository) {
    	this.expenseRepository=expenseRepository;
    }

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));
    }

    public Expense updateExpense(Long id, Expense expense) {
        Expense existingExpense = getExpenseById(id);
        existingExpense.setName(expense.getName());
        existingExpense.setDescription(expense.getDescription());
        existingExpense.setAmount(expense.getAmount());
        existingExpense.setCategory(expense.getCategory());
        return expenseRepository.save(existingExpense);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}