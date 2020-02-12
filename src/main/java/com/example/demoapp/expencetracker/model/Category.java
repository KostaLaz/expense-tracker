package com.example.demoapp.expencetracker.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;


@Entity
@Table(name = "category")
@Data
public class Category {

    @Id
    private long id;

    @NotNull
    //Travel, Grocery etc....
    private String name;



}
