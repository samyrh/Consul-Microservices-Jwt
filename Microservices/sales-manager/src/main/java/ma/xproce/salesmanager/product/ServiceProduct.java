package ma.xproce.salesmanager.product;


import ma.xproce.salesmanager.dto.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "product-service", url = "http://localhost:9090/api/products")
public interface ServiceProduct {

    @GetMapping("/")
    List<Product> getAllProducts();

    @GetMapping("/detail/{id}")
    Product getProductById(@PathVariable("id") Long id);

    @PostMapping("/add")
    Product addProduct(@RequestBody Product product);

    @PutMapping("/update/{id}")
    Product updateProduct(@PathVariable("id") Long id, @RequestBody Product product);

    @DeleteMapping("/delete/{id}")
    void deleteProduct(@PathVariable("id") Long id);
}
