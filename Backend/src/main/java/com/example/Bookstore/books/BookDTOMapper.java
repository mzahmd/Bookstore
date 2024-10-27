package com.example.Bookstore.books;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class BookDTOMapper implements Function<Book, BookDTO> {

    @Override
    public BookDTO apply(Book book) {
        return new BookDTO(book.getIsbn(), book.getTitle(), book.getAuthor());
    }
}
