package ma.xproce.springsecurity.web;

import ma.xproce.springsecurity.dao.entity.Client;
import ma.xproce.springsecurity.dao.repositories.ClientRepository;
import ma.xproce.springsecurity.security.JwtUtil;
import ma.xproce.springsecurity.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.authentication.BadCredentialsException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow CORS for React frontend
public class AuthenticationController {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    // Authenticate and generate JWT token
    @PostMapping("/authenticate")
    public String createAuthenticationToken(@RequestBody String loginRequest) throws Exception {
        String[] credentials = loginRequest.split(",");
        String username = credentials[0].split(":")[1].replaceAll("\"", "");
        String password = credentials[1].split(":")[1].replaceAll("\"", "").replaceAll("}", "");

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid credentials, try again", e);
        }

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
        String jwtToken = jwtUtil.generateToken(userDetails.getUsername());

        // Return JWT token
        return "{ \"jwt\": \"" + jwtToken + "\" }";
    }

    // Register a new client
    @PostMapping("/register")
    public ResponseEntity<String> registerClient(@RequestBody Client client) {
        if (clientRepository.findByUsername(client.getUsername()) != null) {
            return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
        }

        if (clientRepository.findByEmail(client.getEmail()) != null) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }

        if (clientRepository.findByPhone(client.getPhone()) != null) {
            return new ResponseEntity<>("Phone number already exists", HttpStatus.BAD_REQUEST);
        }

        String encodedPassword = passwordEncoder.encode(client.getPassword());
        client.setPassword(encodedPassword);

        try {
            clientRepository.save(client);
            return new ResponseEntity<>("Registration successful! You can now log in.", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Registration failed. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Optional: logout endpoint if you need any server-side cleanup (not necessary for JWT)
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Successfully logged out");
    }
}
