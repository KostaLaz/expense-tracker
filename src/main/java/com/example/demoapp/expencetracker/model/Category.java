package com.example.demoapp.expencetracker.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "category")
@Data
public class Category {

    @Id
    private long id;

    //Travel, Grocery etc....
    private String name;

    //@ManyToOne(cascade = CascadeType.PERSIST) //When we add the user, we need to add the category.
  //  private User user;

}
