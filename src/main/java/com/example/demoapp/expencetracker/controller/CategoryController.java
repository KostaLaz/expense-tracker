package com.example.demoapp.expencetracker.controller;

import com.example.demoapp.expencetracker.model.Category;
import com.example.demoapp.expencetracker.repository.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/categories")
    Collection<Category> categories(){
        return categoryRepository.findAll(); //SELECT * FROM category
    }

    @GetMapping("/category/{id}")
    ResponseEntity<?> getCategory(@PathVariable Long id){
        //Ew use Optional because the id may not be valid
        Optional<Category> category = categoryRepository.findById(id);
        //Map the category to response variable, if the ResponseEntity is ok return the body with the response in it
        // if the ResponseEntity is not ok then return NOT FOUND
        return category.map(response -> ResponseEntity.ok().body(response))
                       .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping ("/category")
    ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) throws URISyntaxException {
        Category result = categoryRepository.save(category); // INSERT INTO TABLE category...
        //We create a ResponseEntity with the URI that will contain the id of the category
        // and then we ill add that to the body of the Response
        return ResponseEntity.created(new URI("/api/category" + result.getId())).body(result);
    }

    @PutMapping("category/{id}")
    ResponseEntity<Category> updateCategory(@Valid @RequestBody Category category){
        Category result = categoryRepository.save(category); // INSERT INTO TABLE category...
        //If this record already exist and the method is PUT, JPA knows that it should be updated and is doing that for us
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("category/{id}")
    ResponseEntity<?> deleteCategory(@Valid @PathVariable Long id){
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
