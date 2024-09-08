package com.example.Bookstore;

import com.example.Bookstore.books.Book;
import com.example.Bookstore.books.BookRepository;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class BookRepositoryTest {

    @Autowired
    private BookRepository undertest;

    @BeforeEach
    void setUp() {
        undertest.deleteAll();
    }

    @Test
    void findBookByIsbn() {
        // Given
        Faker faker = new Faker();
        String isbn = faker.regexify("[a-z1-9]{10}");
        Book book = new Book(isbn, faker.book().title(), faker.book().author());

        undertest.save(book);

        // When
        var actual = undertest.findByIsbn(isbn).orElseThrow();

        // Then
        assertThat(actual).isEqualTo(book);
    }

    @Test
    void existsBookByIsbnFailsWhenIsbnIsNotPresent() {
        // Given
        Faker faker = new Faker();
        String isbn = faker.regexify("[a-z1-9]{10}");

        // When
        boolean actual = undertest.findByIsbn(isbn).isPresent();

        // Then
        assertThat(actual).isFalse();
    }

    @Test
    void existsBookById() {
        // Given
        Faker faker = new Faker();
        String isbn = faker.regexify("[a-z1-9]{10}");
        Book book = new Book(isbn, faker.book().title(), faker.book().author());

        undertest.save(book);

        // When
        var actual = undertest.existsById(book.getId());

        // Then
        assertThat(actual).isTrue();
    }

    @Test
    void existsBookByIdFailsWhenIdIsNotPresent() {
        // Given
        Long id = -1L;

        // When
        var actual = undertest.existsById(id);

        // Then
        assertThat(actual).isFalse();
    }

}
