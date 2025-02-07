package com.example.Bookstore.books;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookDao bookDao;
    private final BookDTOMapper bookDTOMapper;

    public BookService(BookDao bookDao, BookDTOMapper bookDTOMapper) {
        this.bookDao = bookDao;
        this.bookDTOMapper = bookDTOMapper;
    }

    List<BookDTO> getBooks() {
        return bookDao.getBooks().stream()
                .map(bookDTOMapper)
                .toList();
    }

    BookDTO getBookByIsbn(String isbn) {
        return bookDTOMapper.apply(bookDao.getBookByIsbn(isbn));
    }

    void addBook(Book newBook) {
        bookDao.addBook(newBook);
    }

    void updateBook(String isbn, Book updatedBook) {
        bookDao.updateBook(isbn, updatedBook);
    }

    public void deleteBook(String isbn) {
        bookDao.deleteBook(isbn);
    }
}
