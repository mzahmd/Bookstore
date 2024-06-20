package com.example.Bookstore.books;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    List<Book> bookList = new ArrayList<>();

    List<Book> getAllBooks() {
        return bookList;
    }

    void addBook(Book book) {
        bookList.add(book);
    }

    void updateBook(String isbn, Book updateBook) {
        Optional<Book> b = bookList.stream()
                .filter(book -> book.isbn().equals(isbn))
                .findFirst();

        if (b.isEmpty()) {
            throw new IllegalArgumentException("No book with the given ISBN found");
        }

        int index = bookList.indexOf(b.get());
        System.out.println(index);

        bookList.set(index, updateBook);
    }

    public void deleteBook(String isbn) {
        Optional<Book> b = bookList.stream()
                .filter(book -> book.isbn().equals(isbn))
                .findFirst();

        if(b.isEmpty()) {
            throw new IllegalArgumentException("No book with the given ISBN found");
        }

        bookList.remove(b.get());

    }
}
