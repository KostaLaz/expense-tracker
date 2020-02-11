package com.example.demoapp.expencetracker.repository;

import com.example.demoapp.expencetracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long>{

    Category findByName(String name);

}
