package com.example.Bookstore.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

@Service
public class JWTUtil {

    private static final String SECRET_KEY = "foobar_123456789_foobar_123456789_foobar_123456789_foobar_123456789_foobar_123456789_";

    public String issueToken(String subject) {
        return issueToken(subject, Map.of());
    }

    public String issueToken(String subject, String... scope) {
        return issueToken(subject, Map.of("scopes", scope));
    }

    public String issueToken(String subject, Map<String, Object> claims) {
        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuer("http://localhost:8080/")
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(15, ChronoUnit.DAYS)))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

        return token;
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
}
