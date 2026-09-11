package com.board_game_statistics.api;

import com.board_game_statistics.api.auth.dto.LoginRequest;
import com.board_game_statistics.api.auth.dto.LoginResponse;
import com.board_game_statistics.api.exceptions.ErrorResponse;
import org.junit.jupiter.api.Assertions;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class IntegrationTestUtil {
    public static class HttpEntityFactory {
        private final HttpHeaders headers;

        public HttpEntityFactory(HttpHeaders headers) {
            this.headers = headers;
        }

        public HttpEntity<?> noBody() {
            return new HttpEntity<>(headers);
        }

        public <P> HttpEntity<P> body(P payload) {
            return new HttpEntity<>(payload, headers);
        }
    }

    public static HttpEntityFactory login(TestRestTemplate testRestTemplate, String username, String password) {
        LoginRequest request = new LoginRequest(username, password);

        ResponseEntity<LoginResponse> response = testRestTemplate.postForEntity(
                "/auth/login",
                new HttpEntity<>(request),
                LoginResponse.class
        );
        Assertions.assertNotNull(response);

        LoginResponse loginResponse = response.getBody();
        Assertions.assertNotNull(loginResponse);

        HttpHeaders headers = jwtHeaders(loginResponse.jwt());
        return new HttpEntityFactory(headers);
    }

    public static <E extends RuntimeException> void assertErrorResponse(ResponseEntity<ErrorResponse> responseEntity, Class<E> errorClass, HttpStatus status) {
        Assertions.assertEquals(status, responseEntity.getStatusCode());

        ErrorResponse errorResponse = responseEntity.getBody();
        Assertions.assertNotNull(errorResponse);
        Assertions.assertEquals(errorClass.getSimpleName(), responseEntity.getBody().error());
    }

    private static HttpHeaders jwtHeaders(String jwt) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwt);
        return headers;
    }
}
