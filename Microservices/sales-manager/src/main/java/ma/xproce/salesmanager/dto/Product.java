package ma.xproce.salesmanager.dto;


import lombok.Data;

@Data
public class Product {


    private Long id;


    private String nom;


    private String marque;

    private double prix;



    private int qteStock;

}
