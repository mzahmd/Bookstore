package com.example.Bookstore.customer;

import com.example.Bookstore.exception.ResourceNotFoundException;
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
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById(Integer id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer with the id " + id + " not found"));
    }

    @Override
    public void add(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public Optional<Customer> selectCustomerByEmail(String email) {
        return customerRepository.findCustomerByEmail(email);
    }
}
