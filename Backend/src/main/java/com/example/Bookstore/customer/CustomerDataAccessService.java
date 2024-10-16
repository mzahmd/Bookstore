package com.example.Bookstore.customer;

import org.springframework.stereotype.Service;

@Service
public class CustomerDataAccessService implements CustomerDao {

    private final CustomerRepository customerRepository;

    public CustomerDataAccessService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public void add(Customer customer) {
        customerRepository.save(customer);
    }
}
