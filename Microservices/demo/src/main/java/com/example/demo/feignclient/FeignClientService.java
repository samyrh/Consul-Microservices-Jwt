package com.example.demo.feignclient;

import com.example.demo.dao.dto.Client;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "spring-security")
public interface FeignClientService {

    // Endpoint to get client by ID
    @GetMapping("/api/clients/{id}")
    Client getClientById(@PathVariable("id") Long id);
}
