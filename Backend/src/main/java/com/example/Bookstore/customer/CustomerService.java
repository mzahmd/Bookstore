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

    public CustomerDTO getCustomerById(Integer id) {
        return customerDTOMapper.apply(customerDao.getCustomerById(id));
    }

    public void addCustomer(CustomerRegistrationRequest customer) {
        Customer newCustomer = new Customer(
                customer.name(),
                customer.email(),
                passwordEncoder.encode(customer.password()),
                customer.age(),
                customer.gender()
        );
        customerDao.addCustomer(newCustomer);
    }
}
