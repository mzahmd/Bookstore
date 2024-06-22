package com.example.Bookstore.books;

import jakarta.validation.constraints.NotBlank;

public record Book(
        @NotBlank
        String title,
        @NotBlank
        String author,
        @NotBlank
        String isbn
) {}
