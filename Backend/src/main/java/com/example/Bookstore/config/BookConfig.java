package com.example.Bookstore.config;

import com.example.Bookstore.books.Book;
import com.example.Bookstore.books.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BookConfig {

    @Bean
    CommandLineRunner commandLineRunner(BookRepository bookRepository) {
        return args -> {
            Book book1 = new Book("1", "Dragonball", "Akira Toriyama");
            Book book2 = new Book("2", "One Piece", "Eiichirō Oda");
            Book book3 = new Book("3", "Naruto", "Masashi Kishimoto");

            bookRepository.save(book1);
            bookRepository.save(book2);
            bookRepository.save(book3);
        };
    }

}
