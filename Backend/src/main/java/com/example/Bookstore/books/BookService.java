package com.example.Bookstore.books;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookDao bookDao;

    public BookService(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    List<Book> getBooks() {
        return bookDao.getBooks();
    }

    void addBook(Book newBook) {
        bookDao.addBook(newBook);
    }

    void updateBook(String isbn, Book updateBook) {
        bookDao.updateBook(isbn, updateBook);
    }

    public void deleteBook(String isbn) {
        bookDao.deleteBook(isbn);
    }
}
