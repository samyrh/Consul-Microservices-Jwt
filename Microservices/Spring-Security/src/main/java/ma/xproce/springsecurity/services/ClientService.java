package ma.xproce.springsecurity.services;

import ma.xproce.springsecurity.dao.entity.Client;
import ma.xproce.springsecurity.dao.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ClientRepository clientRepository;

    // Get all clients
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    // Get a client by ID
    public Optional<Client> getClientById(Long id) {
        return clientRepository.findById(Math.toIntExact(id));  // Return an Optional from the repository
    }

    // Add a new client with encoded password
    public Client addClient(Client client) {
        client.setPassword(passwordEncoder.encode(client.getPassword())); // Encode password
        return clientRepository.save(client);
    }

    // Update an existing client with encoded password
    public Client updateClient(Long id, Client clientDetails) {
        Optional<Client> client = clientRepository.findById(Math.toIntExact(id));
        if (client.isPresent()) {
            Client updatedClient = client.get();
            updatedClient.setName(clientDetails.getName());
            updatedClient.setUsername(clientDetails.getUsername());
            updatedClient.setPhone(clientDetails.getPhone());
            updatedClient.setEmail(clientDetails.getEmail());

            // Only encode the password if it is provided
            if (clientDetails.getPassword() != null && !clientDetails.getPassword().isEmpty()) {
                updatedClient.setPassword(passwordEncoder.encode(clientDetails.getPassword()));
            }

            return clientRepository.save(updatedClient);
        }
        return null;
    }

    // Delete a client
    public void deleteClient(Long id) {
        clientRepository.deleteById(Math.toIntExact(id));
    }
}
