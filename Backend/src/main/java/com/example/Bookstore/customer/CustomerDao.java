package com.example.Bookstore.customer;

import java.util.List;
import java.util.Optional;

public interface CustomerDao {
    List<Customer> getAllCustomers();
    Customer getCustomerById(Integer id);
    void add(Customer customer);
    Optional<Customer> selectCustomerByEmail(String email);
}
