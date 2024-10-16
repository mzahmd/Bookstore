package com.example.Bookstore.customer;

import java.util.List;

public interface CustomerDao {
    List<Customer> getCustomers();
    void add(Customer customer);
}
