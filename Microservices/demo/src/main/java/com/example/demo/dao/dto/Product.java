package com.example.demo.dao.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    private Long id;
    private String nom;
    private String marque;
    private double prix;
    private int qteStock;

    @JsonProperty("id")
    public Long getId() {
        return id;
    }

    @JsonProperty("nom")
    public String getNom() {
        return nom;
    }

    @JsonProperty("marque")
    public String getMarque() {
        return marque;
    }

    @JsonProperty("prix")
    public double getPrix() {
        return prix;
    }

    @JsonProperty("qteStock")
    public int getQteStock() {
        return qteStock;
    }
}
