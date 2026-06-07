package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.auth.dto.LoginRequest;
import com.board_game_statistics.api.auth.dto.LoginResponse;
import com.board_game_statistics.api.exceptions.ErrorResponse;
import com.board_game_statistics.api.users.User;
import com.board_game_statistics.api.users.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class AuthenticationControllerIntegrationTests {
    private static final String EMAIL = "test@example.com";
    private static final String PASSWORD = "test-password";

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    @Autowired
    private TestRestTemplate testRestTemplate;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private static void assertBadCredentialsResponse(ResponseEntity<ErrorResponse> responseEntity) {
        Assertions.assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());
        Assertions.assertNotNull(responseEntity.getBody());
        Assertions.assertEquals(BadCredentialsException.class.getSimpleName(), responseEntity.getBody().error());
    }

    @BeforeEach
    void beforeEach() {
        userRepository.save(User.builder()
                .email(EMAIL)
                .password(passwordEncoder.encode(PASSWORD))
                .build());
    }

    @AfterEach
    void afterEach() {
        userRepository.deleteAll();
    }

    @Test
    void testLoginSuccessfully() {
        LoginRequest loginRequest = new LoginRequest(EMAIL, PASSWORD);

        LoginResponse loginResponse = testRestTemplate.postForObject("/auth/login", loginRequest, LoginResponse.class);

        List<User> users = userRepository.findAll();

        Assertions.assertTrue(jwtService.isTokenValid(
                loginResponse.jwt(),
                User.builder()
                        .email(EMAIL)
                        .password(passwordEncoder.encode(PASSWORD))
                        .build())
        );
        Assertions.assertEquals(loginResponse.expiresIn(), jwtExpiration);
    }

    @Test
    void testLoginWithIncorrectPassword() {
        LoginRequest loginRequest = new LoginRequest(EMAIL, "incorrect-password");

        ResponseEntity<ErrorResponse> responseEntity = testRestTemplate.postForEntity("/auth/login", loginRequest, ErrorResponse.class);

        assertBadCredentialsResponse(responseEntity);
    }

    @Test
    void testLoginForNonExistentUser() {
        LoginRequest loginRequest = new LoginRequest("incorrect-email", "incorrect-password");

        ResponseEntity<ErrorResponse> responseEntity = testRestTemplate.postForEntity("/auth/login", loginRequest, ErrorResponse.class);

        assertBadCredentialsResponse(responseEntity);
    }
}
