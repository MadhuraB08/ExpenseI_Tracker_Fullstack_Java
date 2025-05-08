package com.expensetracker.controller;

import com.expensetracker.model.Expense;
import com.expensetracker.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseService expenseService;
    
    public ExpenseController(ExpenseService expenseService) {
    	this.expenseService=expenseService;
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        return new ResponseEntity<>(expenseService.getAllExpenses(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        return new ResponseEntity<>(expenseService.getExpenseById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense) {
        return new ResponseEntity<>(expenseService.addExpense(expense), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        return new ResponseEntity<>(expenseService.updateExpense(id, expense), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}