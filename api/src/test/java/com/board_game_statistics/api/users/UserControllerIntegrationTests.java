package com.board_game_statistics.api.users;

import com.board_game_statistics.api.IntegrationTestUtil;
import com.board_game_statistics.api.users.dto.CreateUserRequest;
import com.board_game_statistics.api.users.dto.UserResponse;
import com.board_game_statistics.api.users.user_authorities.Authority;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.net.URI;
import java.util.EnumSet;
import java.util.List;
import java.util.Objects;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerIntegrationTests {
    private record UserDetails(String email, String password, String firstName, String lastName,
                               EnumSet<Authority> authorities) {}

    private static final UserDetails[] TEST_USERS = {
            new UserDetails("first@example.com", "first-password", "First", "Firstson", EnumSet.of(Authority.MANAGE_USERS)),
            new UserDetails("second@example.com", "second-password", "Second", "Secondson", EnumSet.noneOf(Authority.class)),
            new UserDetails("third@example.com", "third-password", "Third", "Thirdson", EnumSet.noneOf(Authority.class)),
    };

    @Autowired
    private TestRestTemplate testRestTemplate;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void beforeEach() {
        for (UserDetails user : TEST_USERS) {
            userRepository.save(User.builder()
                    .email(user.email())
                    .password(passwordEncoder.encode(user.password()))
                    .firstName(user.firstName())
                    .lastName(user.lastName())
                    .authorities(user.authorities())
                    .build());
        }
    }

    @AfterEach
    void afterEach() {
        userRepository.deleteAll();
    }

    @Test
    void testGetUsers() {
        UserDetails user = TEST_USERS[0];

        ResponseEntity<List<UserResponse>> responseEntity = testRestTemplate.exchange(
                "/users",
                HttpMethod.GET,
                IntegrationTestUtil.loginAndGetJwtEntity(testRestTemplate, user.email(), user.password()),
                new ParameterizedTypeReference<>() {}
        );

        Assertions.assertNotNull(responseEntity);

        List<UserResponse> userResponses = responseEntity.getBody();

        Assertions.assertNotNull(userResponses);
        Assertions.assertEquals(TEST_USERS.length, userResponses.size());

        for (int i = 0; i < userResponses.size(); ++i) {
            Assertions.assertTrue(hasEqualContents(TEST_USERS[i], userResponses.get(i)));
        }
    }

    @Test
    void testCreateAndGetUserFromOtherAccount() {
        UserDetails newUser = new UserDetails(
                "fourth@example.com", "fourth-password", "Fourth", "Fourthson", EnumSet.noneOf(Authority.class)
        );

        ResponseEntity<UserResponse> createUserResponseEntity = createUserAndAssertExpectedResponse(newUser);

        UserDetails currentUser = TEST_USERS[0];

        URI userUri = createUserResponseEntity.getHeaders().getLocation();

        ResponseEntity<UserResponse> getUserResponseEntity = testRestTemplate.exchange(
                userUri,
                HttpMethod.GET,
                IntegrationTestUtil.loginAndGetJwtEntity(testRestTemplate, currentUser.email(), currentUser.password()),
                new ParameterizedTypeReference<>() {}
        );

        assertUserResponseEntityHasUserDetails(getUserResponseEntity, newUser);
    }

    @Test
    void testCreateAndGetMe() {
        UserDetails newUser = new UserDetails(
                "fourth@example.com", "fourth-password", "Fourth", "Fourthson", EnumSet.noneOf(Authority.class)
        );

        createUserAndAssertExpectedResponse(newUser);

        ResponseEntity<UserResponse> getMeResponseEntity = testRestTemplate.exchange(
                "/users/me",
                HttpMethod.GET,
                IntegrationTestUtil.loginAndGetJwtEntity(testRestTemplate, newUser.email(), newUser.password()),
                new ParameterizedTypeReference<>() {}
        );

        assertUserResponseEntityHasUserDetails(getMeResponseEntity, newUser);
    }

    private ResponseEntity<UserResponse> createUserAndAssertExpectedResponse(UserDetails userDetails) {
        CreateUserRequest request = createUserRequestFrom(userDetails);

        ResponseEntity<UserResponse> createUserResponseEntity = testRestTemplate.exchange(
                "/users",
                HttpMethod.POST,
                new HttpEntity<>(request),
                new ParameterizedTypeReference<>() {}
        );

        assertUserResponseEntityHasUserDetails(createUserResponseEntity, userDetails);

        return createUserResponseEntity;
    }

    private void assertUserResponseEntityHasUserDetails(ResponseEntity<UserResponse> responseEntity, UserDetails expectedUserDetails) {
        Assertions.assertNotNull(responseEntity);

        UserResponse responseBody = responseEntity.getBody();
        Assertions.assertNotNull(responseBody);
        Assertions.assertTrue(hasEqualContents(expectedUserDetails, responseBody));
    }

    private boolean hasEqualContents(UserDetails userDetails, UserResponse userResponse) {
        return (
                userDetails == null
                        && userResponse == null
        ) || (
                userDetails != null
                        && userResponse != null
                        && Objects.equals(userDetails.email(), userResponse.email())
                        && Objects.equals(userDetails.firstName(), userResponse.firstName())
                        && Objects.equals(userDetails.lastName(), userResponse.lastName())
        );
    }

    private CreateUserRequest createUserRequestFrom(UserDetails userDetails) {
        return new CreateUserRequest(userDetails.email(), userDetails.password(), userDetails.firstName(), userDetails.lastName());
    }
}
