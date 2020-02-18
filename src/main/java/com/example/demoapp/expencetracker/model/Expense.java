package com.example.demoapp.expencetracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "expenses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Expense {

    @Id
    private long id;

    private Instant expenceDate;

    private String destription;

    private String location;

    @ManyToOne
    private Category category;

    @ManyToOne
    private User user;




}
