package com.example.Bookstore.config;

import com.example.Bookstore.books.Book;
import com.example.Bookstore.books.BookRepository;
import com.example.Bookstore.customer.Customer;
import com.example.Bookstore.customer.CustomerRepository;
import com.example.Bookstore.customer.Gender;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

@Configuration
public class BookConfig {

    @Bean
    CommandLineRunner commandLineRunner(BookRepository bookRepository, CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            Book book1 = new Book("1", "Dragonball", "Akira Toriyama");
            Book book2 = new Book("2", "One Piece", "Eiichiro Oda");
            Book book3 = new Book("3", "Naruto", "Masashi Kishimoto");

            bookRepository.save(book1);
            bookRepository.save(book2);
            bookRepository.save(book3);

            Customer customer1 = new Customer(
                    "Max Mustermann",
                    "max.mustermann@gmail.com",
                    passwordEncoder.encode("password"),
                    18,
                    Gender.MALE
            );
            Customer customer2 = new Customer(
                    "Anna Max",
                    "anna.max@gmail.com",
                    "password",
                    33,
                    Gender.FEMALE
            );

            customerRepository.save(customer1);
            customerRepository.save(customer2);
        };
    }
}
