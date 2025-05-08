package com.expensetracker.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String category;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

	 public Object getName() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setName(Object name2) {
		// TODO Auto-generated method stub
		
	}

	public Object getDescription() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setDescription(Object description2) {
		// TODO Auto-generated method stub
		
	}

	public Object getAmount() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setAmount(Object amount2) {
		// TODO Auto-generated method stub
		
	}

	public Object getCategory() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setCategory(Object category2) {
		// TODO Auto-generated method stub
		
	}
}