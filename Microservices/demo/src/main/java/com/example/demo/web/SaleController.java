package com.example.demo.web;


import com.example.demo.dao.dto.Client;
import com.example.demo.dao.dto.Product;
import com.example.demo.dao.dto.SaleRequest;
import com.example.demo.dao.dto.SaleResponse;
import com.example.demo.dao.entities.Sale;
import com.example.demo.dao.repository.SaleRepository;
import com.example.demo.feignclient.FeignClientService;
import com.example.demo.feignclient.FeignProduct;
import com.example.demo.services.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "http://localhost:3000")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private FeignProduct feignProduct;

    @Autowired
    private FeignClientService feignClientService;
    // Endpoint to create a new sale
    @PostMapping("/create")
    public ResponseEntity<SaleResponse> createSale(@RequestBody SaleRequest saleRequest) {
        // Call the SaleService to create the sale
        SaleResponse saleResponse = saleService.createSale(saleRequest);

        // Return the created sale response with HTTP status 201 (Created)
        return ResponseEntity.status(201).body(saleResponse);
    }
    @GetMapping("/all-sales")
    public ResponseEntity<List<Map<String, Object>>> getAllSales() {
        try {
            // Fetch all sales from the repository
            List<Sale> sales = saleRepository.findAll();
            List<Map<String, Object>> salesData = new ArrayList<>();

            // For each sale, fetch the associated client and product using FeignClient
            for (Sale sale : sales) {
                Map<String, Object> saleData = new HashMap<>();
                Client client = feignClientService.getClientById(sale.getClientId());
                Product product = feignProduct.getProductById(sale.getProductId());

                saleData.put("sale", sale);
                saleData.put("client", client);
                saleData.put("product", product);

                salesData.add(saleData);
            }

            return ResponseEntity.ok(salesData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonList(Map.of("error", e.getMessage())));
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSale(@PathVariable Long id) {
        try {
            // Check if the sale exists
            if (!saleRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Sale not found with ID: " + id);
            }

            // Delete the sale by ID
            saleRepository.deleteById(id);
            return ResponseEntity.ok("Sale deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting sale: " + e.getMessage());
        }
    }


}