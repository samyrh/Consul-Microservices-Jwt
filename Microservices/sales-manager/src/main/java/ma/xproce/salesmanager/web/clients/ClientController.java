package ma.xproce.salesmanager.web.clients;


import ma.xproce.salesmanager.dto.Client;
import ma.xproce.salesmanager.client.ServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

    @Autowired
    private ServiceClient serviceClient;

    @GetMapping("")
    public List<Client> getAllClients() {
        return serviceClient.getAllClients();
    }

    @GetMapping("/{id}")
    public Client getClientById(@PathVariable("id") Long id) {
        return serviceClient.getClientById(id);
    }

    @PostMapping("/add")
    public Client addClient(@RequestBody Client client) {
        return serviceClient.addClient(client);
    }

    @PutMapping("/update/{id}")
    public Client updateClient(@PathVariable("id") Long id, @RequestBody Client client) {
        return serviceClient.updateClient(id, client);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteClient(@PathVariable("id") Long id) {
        serviceClient.deleteClient(id);
    }
}
