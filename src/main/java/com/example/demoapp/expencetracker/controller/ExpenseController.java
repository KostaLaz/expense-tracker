package com.example.demoapp.expencetracker.controller;

import com.example.demoapp.expencetracker.model.Expense;
import com.example.demoapp.expencetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

@RestController
@RequestMapping("/api")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/expenses")
    Collection <Expense> getExpenses(){
        return expenseRepository.findAll(); //SELECT * FROM expenses
    }

    @DeleteMapping("/expenses")
    ResponseEntity<?> deleteExpense(@PathVariable Long id){
         expenseRepository.deleteById();
        return ResponseEntity.ok().build();
    }

    @PostMapping("expenses")
    ResponseEntity<Expense> creteExpense(@Valid @RequestBody Expense expense) throws URISyntaxException{
         Expense result = expenseRepository.save(expense);
         return ResponseEntity.created(new URI("/api/expenses/" + result.getId())).body(result);

    }


}
