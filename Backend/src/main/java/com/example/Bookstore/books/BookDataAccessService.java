package com.example.Bookstore.books;

import com.example.Bookstore.exception.DuplicateResourceException;
import com.example.Bookstore.exception.ResourceNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookDataAccessService implements BookDao {
    BookRepository bookRepository;

    public BookDataAccessService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookByISBN(String isbn) {
        return bookRepository.findByIsbn(isbn)
                .orElseThrow(() -> new ResourceNotFoundException("Book with given ISBN not found"));
    }

    @Override
    public void addBook(Book newBook) {
        boolean bookExists = bookRepository.findByIsbn(newBook.getIsbn()).isPresent();

        if (bookExists) {
            throw new DuplicateResourceException("ISBN already exists");
        }

        bookRepository.save(newBook);
    }

    @Override
    public void updateBook(String isbn, Book updateBook) {
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

    @Override
    public void deleteBook(String isbn) {
        Book oldBook = bookRepository.findByIsbn(isbn)
                .orElseThrow(() -> new ResourceNotFoundException("No book with the given ISBN found"));

        bookRepository.deleteById(oldBook.getId());
    }
}
