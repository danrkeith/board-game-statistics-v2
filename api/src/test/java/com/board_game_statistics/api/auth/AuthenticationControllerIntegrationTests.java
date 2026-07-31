package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.IntegrationTestUtil;
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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class AuthenticationControllerIntegrationTests {
    private record UserDetails(String email, String password) {}

    private static final UserDetails TEST_USER = new UserDetails("test@example.com", "test-password");

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

    @BeforeEach
    void beforeEach() {
        userRepository.save(User.builder()
                .email(TEST_USER.email())
                .password(passwordEncoder.encode(TEST_USER.password()))
                .build());
    }

    @AfterEach
    void afterEach() {
        userRepository.deleteAll();
    }

    @Test
    void testLoginSuccessfully() {
        LoginRequest loginRequest = new LoginRequest(TEST_USER.email(), TEST_USER.password());

        ResponseEntity<LoginResponse> responseEntity = testRestTemplate.postForEntity(
                "/auth/login",
                new HttpEntity<>(loginRequest),
                LoginResponse.class
        );

        Assertions.assertTrue(responseEntity.getStatusCode().is2xxSuccessful());

        LoginResponse loginResponse = responseEntity.getBody();
        Assertions.assertNotNull(loginResponse);

        Assertions.assertTrue(jwtService.isTokenValid(
                loginResponse.jwt(),
                User.builder()
                        .email(TEST_USER.email())
                        .password(passwordEncoder.encode(TEST_USER.password()))
                        .build())
        );
        Assertions.assertEquals(loginResponse.expiresIn(), jwtExpiration);
    }

    @Test
    void testLoginWithIncorrectPassword() {
        LoginRequest loginRequest = new LoginRequest(TEST_USER.email(), "incorrect-password");

        ResponseEntity<ErrorResponse> responseEntity = testRestTemplate.postForEntity("/auth/login", loginRequest, ErrorResponse.class);

        assertBadCredentialsResponse(responseEntity);
    }

    @Test
    void testLoginForNonExistentUser() {
        LoginRequest loginRequest = new LoginRequest("incorrect-email", "incorrect-password");

        ResponseEntity<ErrorResponse> responseEntity = testRestTemplate.postForEntity("/auth/login", loginRequest, ErrorResponse.class);

        assertBadCredentialsResponse(responseEntity);
    }

    private static void assertBadCredentialsResponse(ResponseEntity<ErrorResponse> responseEntity) {
        IntegrationTestUtil.assertErrorResponse(responseEntity, BadCredentialsException.class, HttpStatus.UNAUTHORIZED);
    }
}
