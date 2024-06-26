package com.example.Bookstore.books;

import com.example.Bookstore.exception.DuplicateResourceException;
import com.example.Bookstore.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    List<Book> getBooks() {
        return bookRepository.findAll();
    }

    void addBook(Book newBook) {
        boolean bookExists = bookRepository.findByIsbn(newBook.getIsbn()).isPresent();

        if (bookExists) {
            throw new DuplicateResourceException("ISBN already exists");
        }

        bookRepository.save(newBook);
    }

    void updateBook(String isbn, Book updateBook) {
        boolean bookExists = bookRepository.findByIsbn(updateBook.getIsbn()).isPresent();

        if (bookExists) {
            throw new DuplicateResourceException("ISBN already exists");
        }

        Book oldBook = bookRepository.findByIsbn(isbn)
                .orElseThrow(() -> new ResourceNotFoundException("Given ISBN is not Valid"));

        oldBook.setIsbn(updateBook.getIsbn());
        oldBook.setTitle(updateBook.getTitle());
        oldBook.setAuthor(updateBook.getAuthor());

        bookRepository.save(oldBook);
    }

    public void deleteBook(String isbn) {
        Book oldBook = bookRepository.findByIsbn(isbn)
                .orElseThrow(() -> new ResourceNotFoundException("No book with the given ISBN found"));

        bookRepository.deleteById(oldBook.getId());
    }
}
