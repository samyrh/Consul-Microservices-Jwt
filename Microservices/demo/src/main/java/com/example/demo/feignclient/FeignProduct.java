package com.example.demo.feignclient;

import com.example.demo.dao.dto.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-service")
public interface FeignProduct {

    @GetMapping("/api/products/{id}")
    Product getProductById(@PathVariable("id") Long id);
}
