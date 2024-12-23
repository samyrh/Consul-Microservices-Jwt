package ma.xproce.salesmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SalesManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SalesManagerApplication.class, args);
    }

}
