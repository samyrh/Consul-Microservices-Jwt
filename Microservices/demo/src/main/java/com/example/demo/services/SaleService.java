package com.example.demo.services;

import com.example.demo.dao.dto.Client;
import com.example.demo.dao.dto.Product;
import com.example.demo.dao.dto.SaleRequest;
import com.example.demo.dao.dto.SaleResponse;
import com.example.demo.dao.entities.Sale;
import com.example.demo.dao.repository.SaleRepository;
import com.example.demo.feignclient.FeignClientService;
import com.example.demo.feignclient.FeignProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class SaleService {
    @Autowired
    private FeignClientService clientFeignClient;
    @Autowired
    private FeignProduct productFeignClient;
    @Autowired
    private SaleRepository saleRepository;

    public SaleResponse createSale(SaleRequest saleRequest) {
        try {
            // Fetch client details using FeignClient
            Client client = clientFeignClient.getClientById(saleRequest.getClientId());
            // Fetch product details using FeignClient
            Product product = productFeignClient.getProductById(saleRequest.getProductId());

            // If client or product is not found, throw an exception
            if (client == null || product == null) {
                throw new RuntimeException("Client or Product not found.");
            }

            // Create the sale
            Sale sale = new Sale();
            sale.setClientId(saleRequest.getClientId());
            sale.setProductId(saleRequest.getProductId());
            sale.setQuantity(saleRequest.getQuantity());
            sale.setDate(new Date());

            Sale savedSale = saleRepository.save(sale);

            return new SaleResponse(savedSale.getId(), savedSale.getClientId(), savedSale.getProductId(), savedSale.getQuantity(), client, product);

        } catch (Exception e) {
            throw new RuntimeException("Error creating sale: " + e.getMessage());
        }
    }
}
