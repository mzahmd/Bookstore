package com.example.Bookstore.customer;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CustomerDTOMapper implements Function<Customer, CustomerDTO> {

    @Override
    public CustomerDTO apply(Customer customer) {
        return new CustomerDTO(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getGender(),
                customer.getAge(),
                customer.getAuthorities().stream()
                        .map(role -> role.getAuthority())
                        .toList(),
                customer.getUsername());
    }
}
