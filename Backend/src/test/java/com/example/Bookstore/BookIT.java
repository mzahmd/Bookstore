package com.example.Bookstore;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BookIT {

    @Autowired
    private WebTestClient webTestClient;

    private static final String BOOK_PATH = "/api/v1/book";

    @Test
    void canGetBooks() {


        // get all books
        webTestClient.get()
                .uri(BOOK_PATH)
                .exchange()
                .expectStatus()
                .isOk();
    }
}
