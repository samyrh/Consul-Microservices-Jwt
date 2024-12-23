package com.example.demo.dao.entities;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long clientId;

    private Long productId;

    @Temporal(TemporalType.DATE)
    private Date date;

    private int quantity;


    public Sale(Long id, Long clientId, Long productId, Date date, int quantity) {
        this.id = id;
        this.clientId = clientId;
        this.productId = productId;
        this.date = date;
        this.quantity = quantity;
    }

    public Sale() {

    }

    public Long getId() {
        return id;
    }

    public Long getClientId() {
        return clientId;
    }

    public Long getProductId() {
        return productId;
    }

    public Date getDate() {
        return date;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}