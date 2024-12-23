package ma.xproce.springsecurity.dao.repositories;

import ma.xproce.springsecurity.dao.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Integer> {


    Client findByUsername(String username);



    // Method to find a client by email
    Client findByEmail(String email);

    // Method to find a client by phone number
    Client findByPhone(String phone);
}
