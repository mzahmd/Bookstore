package com.example.Bookstore.books;

import com.example.Bookstore.exception.DuplicateResourceException;
import com.example.Bookstore.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    List<Book> bookList = new ArrayList<>();

    List<Book> getBooks() {
        return bookList;
    }

    void addBook(Book newBook) {
        Optional<Book> b = bookList.stream()
                .filter(book -> book.isbn().equals(newBook.isbn()))
                .findFirst();

        if (b.isPresent()) {
            throw new DuplicateResourceException("ISBN already exists");
        }

        bookList.add(newBook);
    }

    void updateBook(String isbn, Book updateBook) {
        Optional<Book> b = bookList.stream()
                .filter(book -> book.isbn().equals(isbn))
                .findFirst();

        if (b.isEmpty()) {
            throw new ResourceNotFoundException("No book with the given ISBN found");
        }

        int index = bookList.indexOf(b.get());

        bookList.set(index, updateBook);
    }

    public void deleteBook(String isbn) {
        Optional<Book> b = bookList.stream()
                .filter(book -> book.isbn().equals(isbn))
                .findFirst();

        if (b.isEmpty()) {
            throw new ResourceNotFoundException("No book with the given ISBN found");
        }

        bookList.remove(b.get());

    }
}
