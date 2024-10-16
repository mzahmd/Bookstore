package com.example.Bookstore.customer;

import org.springframework.stereotype.Service;

import java.util.List;

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
}
