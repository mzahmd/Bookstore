package com.example.Bookstore.auth;

import com.example.Bookstore.customer.CustomerDTO;

public record AuthenticationResponse(String token, CustomerDTO customerDTO) {
}
