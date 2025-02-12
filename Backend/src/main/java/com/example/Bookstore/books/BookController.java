package com.example.Bookstore.books;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

@RestController
@RequestMapping("api/v1/book")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    List<BookDTO> getBooks() {
        return bookService.getBooks();
    }

    @GetMapping("{isbn}")
    BookDTO getBookByIsbn(@PathVariable String isbn) {
        return bookService.getBookByIsbn(isbn);
    }

    @PostMapping
    public void addBook(@RequestBody Book book) {
        bookService.addBook(book);
    }

    @PutMapping("{isbn}")
    public void updateBook(@PathVariable String isbn, @RequestBody Book book) {
        bookService.updateBook(isbn, book);
    }

    @DeleteMapping("{isbn}")
    public void deleteBook(@PathVariable String isbn) {
        bookService.deleteBook(isbn);
    }
}
