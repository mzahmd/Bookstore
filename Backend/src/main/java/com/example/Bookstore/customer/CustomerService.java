package com.example.Bookstore.customer;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerDao customerDao;
    private final PasswordEncoder passwordEncoder;
    private final CustomerDTOMapper customerDTOMapper;

    public CustomerService(CustomerDao customerDao, PasswordEncoder passwordEncoder, CustomerDTOMapper customerDTOMapper) {
        this.customerDao = customerDao;
        this.passwordEncoder = passwordEncoder;
        this.customerDTOMapper = customerDTOMapper;
    }

    public List<CustomerDTO> getAllCustomers() {
        return customerDao.getAllCustomers()
                .stream()
                .map(customerDTOMapper)
                .toList();
    }

    public void addCustomer(Customer customer) {
        Customer newCustomer = new Customer(
                customer.getName(),
                customer.getEmail(),
                passwordEncoder.encode(customer.getPassword()),
                customer.getAge(),
                customer.getGender()
        );
        customerDao.add(newCustomer);
    }
}
