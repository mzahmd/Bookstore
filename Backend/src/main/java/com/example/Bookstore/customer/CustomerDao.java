package com.example.Bookstore.customer;

import java.util.List;

public interface CustomerDao {
    List<Customer> getAllCustomers();
    Customer getCustomerById(Integer id);
    void addCustomer(Customer customer);
    Customer getCustomerByEmail(String email);
}
