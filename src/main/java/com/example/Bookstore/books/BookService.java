package com.example.Bookstore.books;

import com.example.Bookstore.exception.DuplicateResourceException;
import com.example.Bookstore.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    List<Book> bookList = new ArrayList<>();

    List<Book> getBooks() {
        return bookList;
    }

    void addBook(Book newBook) {
        boolean bookExists = bookList.stream()
                .anyMatch(book -> book.isbn().equals(newBook.isbn()));

        if (bookExists) {
            throw new DuplicateResourceException("ISBN already exists");
        }

        bookList.add(newBook);
    }

    void updateBook(String isbn, Book updateBook) {
        boolean bookExists = bookList.stream()
                .anyMatch(book -> book.isbn().equals(updateBook.isbn()));

        if(bookExists) {
            throw new DuplicateResourceException("ISBN already exists");
        }

        Book oldBook = bookList.stream()
                .filter(book -> book.isbn().equals(isbn))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Given ISBN is not Valid"));

        int index = bookList.indexOf(oldBook);

        bookList.set(index, updateBook);
    }

    public void deleteBook(String isbn) {
        Book oldBook = bookList.stream()
                .filter(book -> book.isbn().equals(isbn))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No book with the given ISBN found"));

        bookList.remove(oldBook);

    }
}
