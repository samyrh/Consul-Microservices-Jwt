package ma.xproce.salesmanager.web.products;


import ma.xproce.salesmanager.dto.Product;
import ma.xproce.salesmanager.product.ServiceProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ServiceProduct serviceProduct;

    @GetMapping("/")
    public List<Product> getAllProducts() {
        return serviceProduct.getAllProducts();
    }

    @GetMapping("/detail/{id}")
    public Product getProductById(@PathVariable("id") Long id) {
        return serviceProduct.getProductById(id);
    }

    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product) {
        return serviceProduct.addProduct(product);
    }

    @PutMapping("/update/{id}")
    public Product updateProduct(@PathVariable("id") Long id, @RequestBody Product product) {
        return serviceProduct.updateProduct(id, product);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable("id") Long id) {
        serviceProduct.deleteProduct(id);
    }
}
