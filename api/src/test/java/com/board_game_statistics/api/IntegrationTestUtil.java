package com.board_game_statistics.api;

import com.board_game_statistics.api.auth.dto.LoginRequest;
import com.board_game_statistics.api.auth.dto.LoginResponse;
import org.junit.jupiter.api.Assertions;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

public class IntegrationTestUtil {
    public static ResponseEntity<LoginResponse> login(TestRestTemplate testRestTemplate, String username, String password) {
        LoginRequest loginRequest = new LoginRequest(username, password);

        return testRestTemplate.postForEntity(
                "/auth/login",
                new HttpEntity<>(loginRequest),
                LoginResponse.class
        );
    }

    public static String loginAndGetJwt(TestRestTemplate testRestTemplate, String username, String password) {
        LoginResponse loginResponse = login(testRestTemplate, username, password).getBody();

        Assertions.assertNotNull(loginResponse);

        return loginResponse.jwt();
    }

    public static HttpEntity<?> loginAndGetJwtEntity(TestRestTemplate testRestTemplate, String username, String password) {
        return jwtEntity(loginAndGetJwt(testRestTemplate, username, password));
    }

    public static <P> HttpEntity<P> loginAndGetJwtEntity(TestRestTemplate testRestTemplate, String username, String password, P payload) {
        return jwtEntity(loginAndGetJwt(testRestTemplate, username, password), payload);
    }

    private static HttpEntity<?> jwtEntity(String jwt) {
        return new HttpEntity<>(jwtHeaders(jwt));
    }

    private static <P> HttpEntity<P> jwtEntity(String jwt, P payload) {
        return new HttpEntity<>(payload, jwtHeaders(jwt));
    }

    private static HttpHeaders jwtHeaders(String jwt) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwt);
        return headers;
    }
}
