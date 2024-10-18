package com.example.Bookstore.customer;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerDataAccessService implements CustomerDao {
    CustomerRepository customerRepository;

    public CustomerDataAccessService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<Customer> getCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public void add(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public Optional<Customer> selectCustomerByEmail(String email) {
        return customerRepository.findByEmail(email);
    }
}
