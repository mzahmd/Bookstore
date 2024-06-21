package com.example.Bookstore.books;

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
        if (newBook.isbn() == null || newBook.isbn().isEmpty()) {
            throw new IllegalArgumentException("ISBN is invalid");
        }
        if (newBook.author() == null || newBook.author().isEmpty()) {
            throw new IllegalArgumentException("Author is invalid");
        }
        if (newBook.title() == null || newBook.title().isEmpty()) {
            throw new IllegalArgumentException("Title is invalid");
        }

        Optional<Book> b = bookList.stream()
                .filter(book -> book.isbn().equals(newBook.isbn()))
                .findFirst();

        if (b.isPresent()) {
            throw new IllegalArgumentException("ISBN Number already exists");
        }

        bookList.add(newBook);
    }

    void updateBook(String isbn, Book updateBook) {
        Optional<Book> b = bookList.stream()
                .filter(book -> book.isbn().equals(isbn))
                .findFirst();

        if (b.isEmpty()) {
            throw new IllegalArgumentException("No book with the given ISBN found");
        }

        int index = bookList.indexOf(b.get());

        bookList.set(index, updateBook);
    }

    public void deleteBook(String isbn) {
        Optional<Book> b = bookList.stream()
                .filter(book -> book.isbn().equals(isbn))
                .findFirst();

        if (b.isEmpty()) {
            throw new IllegalArgumentException("No book with the given ISBN found");
        }

        bookList.remove(b.get());

    }
}
