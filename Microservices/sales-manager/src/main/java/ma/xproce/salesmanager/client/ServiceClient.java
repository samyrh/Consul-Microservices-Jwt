package ma.xproce.salesmanager.client;



import ma.xproce.salesmanager.dto.Client;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "client-service", url = "http://localhost:9999/api/clients")
public interface ServiceClient {

    @GetMapping("")
    List<Client> getAllClients();

    @GetMapping("/{id}")
    Client getClientById(@PathVariable("id") Long id);

    @PostMapping("/add")
    Client addClient(@RequestBody Client client);

    @PutMapping("/update/{id}")
    Client updateClient(@PathVariable("id") Long id, @RequestBody Client client);

    @DeleteMapping("/delete/{id}")
    void deleteClient(@PathVariable("id") Long id);
}
