package com.example.Bookstore;

import com.example.Bookstore.customer.Customer;
import com.example.Bookstore.customer.Gender;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.util.Random;

// TODO: more tests

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BookIT {

    @Autowired
    private WebTestClient webTestClient;

    private static final String BOOK_PATH = "/api/v1/book";
    private static final String CUSTOMER_PATH = "/api/v1/customer";

    @Test
    void canGetBooks() {
        Random random = new Random();
        Faker faker = new Faker();

        String fullName = faker.name().fullName();
        String email = faker.name().firstName() + "." + faker.name().lastName() + "@gmail.com";
        int age = random.nextInt(1, 100);
        Gender gender = age % 2 == 0 ? Gender.MALE : Gender.FEMALE;

        Customer register = new Customer(fullName, email, "password", age, gender);

        String jwtToken = webTestClient.post()
                .uri(CUSTOMER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(register), Customer.class)
                .exchange()
                .expectStatus()
                .isOk()
                .returnResult(Void.class)
                .getResponseHeaders()
                .get(HttpHeaders.AUTHORIZATION)
                .get(0);

        // get all books
        webTestClient.get()
                .uri(BOOK_PATH)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk();
    }
}
