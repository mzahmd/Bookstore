package com.example.Bookstore.customer;

import com.example.Bookstore.jwt.JWTUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/customer")
public class CustomerController {
    private final CustomerService customerService;
    private final JWTUtil jwtUtil;

    public CustomerController(CustomerService customerService, JWTUtil jwtUtil) {
        this.customerService = customerService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public List<Customer> getCustomer() {
        return customerService.getCustomers();
    }

    @PostMapping
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer) {
        customerService.addCustomer(customer);
        String jwtToken = jwtUtil.issueToken(customer.getEmail(), "ROLE_USER");
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, jwtToken)
                .build();
    }
}
