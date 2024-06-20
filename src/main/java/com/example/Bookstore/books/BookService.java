package com.example.Bookstore.books;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    List <Book> bookList = new ArrayList<>();

    List<Book> getAllBooks() {
        return bookList;
    }


}
