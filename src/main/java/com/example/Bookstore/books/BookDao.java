package com.example.Bookstore.books;

import java.util.List;

public interface BookDao {

    List<Book> getBooks();
    void addBook(Book book);
    void updateBook(String isbn, Book updateBook);
    void deleteBook(String isbn);
}
