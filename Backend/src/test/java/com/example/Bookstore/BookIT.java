package com.example.Bookstore;

import com.example.Bookstore.books.Book;
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

    @Test
    void canAddBooks() {
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

        Book newBook = new Book("123", "My title", "The Author");

        // add a book
        webTestClient.post()
                .uri(BOOK_PATH)
                .bodyValue(newBook)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk();
    }

    @Test
    void canUpdateBooks() {
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

        Book newBook = new Book("124", "My title", "The Author");
        Book updateBook = new Book("125", "New Title", "New Author");

        // add a book
        webTestClient.post()
                .uri(BOOK_PATH)
                .bodyValue(newBook)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk();

        // update book
        webTestClient.put()
                .uri(BOOK_PATH + "/124")
                .bodyValue(updateBook)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk();
    }

    @Test
    void canDeleteBooks() {
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

        Book newBook = new Book("126", "My title", "The Author");

        // add a book
        webTestClient.post()
                .uri(BOOK_PATH)
                .bodyValue(newBook)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk();

        // delete book
        webTestClient.delete()
                .uri(BOOK_PATH + "/126")
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk();
    }
}
