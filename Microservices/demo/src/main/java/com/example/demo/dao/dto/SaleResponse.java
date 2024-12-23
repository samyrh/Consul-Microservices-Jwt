package com.example.demo.dao.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleResponse {

    private Long id;
    private Long clientId;
    private Long productId;
    private int quantity;

    private Client client;  // Client DTO
    private Product product;  // Product DTO

    // Make sure getter and setter methods are there for all fields
    @JsonProperty("id")
    public Long getId() {
        return id;
    }

    @JsonProperty("clientId")
    public Long getClientId() {
        return clientId;
    }

    @JsonProperty("productId")
    public Long getProductId() {
        return productId;
    }

    @JsonProperty("quantity")
    public int getQuantity() {
        return quantity;
    }

    @JsonProperty("client")
    public Client getClient() {
        return client;
    }

    @JsonProperty("product")
    public Product getProduct() {
        return product;

    }

    public SaleResponse(Long id, Long clientId, Long productId, int quantity, Client client, Product product) {
        this.id = id;
        this.clientId = clientId;
        this.productId = productId;
        this.quantity = quantity;
        this.client = client;
        this.product = product;
    }

}
