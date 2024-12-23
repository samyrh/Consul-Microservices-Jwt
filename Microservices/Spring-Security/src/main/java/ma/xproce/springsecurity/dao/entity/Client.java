package ma.xproce.springsecurity.dao.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clients")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Client {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;



}