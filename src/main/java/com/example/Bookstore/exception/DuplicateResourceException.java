package com.example.Bookstore.exception;

public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String msg) {
        super(msg);
    }
}
