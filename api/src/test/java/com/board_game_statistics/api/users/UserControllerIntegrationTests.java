package com.board_game_statistics.api.users;

import com.board_game_statistics.api.IntegrationTestUtil;
import com.board_game_statistics.api.exceptions.ErrorResponse;
import com.board_game_statistics.api.users.dto.CreateUserRequest;
import com.board_game_statistics.api.users.dto.EditUserRequest;
import com.board_game_statistics.api.users.dto.UserResponse;
import com.board_game_statistics.api.users.exceptions.InvalidEmailException;
import com.board_game_statistics.api.users.exceptions.InvalidPasswordException;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.net.URI;
import java.util.EnumSet;
import java.util.List;
import java.util.Objects;

import static com.board_game_statistics.api.IntegrationTestUtil.HttpEntityFactory;
import static com.board_game_statistics.api.IntegrationTestUtil.login;

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

        HttpEntityFactory jwtEntityFactory = login(testRestTemplate, user.email(), user.password());

        ResponseEntity<List<UserResponse>> responseEntity = testRestTemplate.exchange(
                "/users",
                HttpMethod.GET,
                jwtEntityFactory.noBody(),
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
    void testCreateUserAndGetMe() {
        UserDetails newUser = new UserDetails(
                "fourth@example.com", "fourth-password", "Fourth", "Fourthson", EnumSet.noneOf(Authority.class)
        );

        createUserAndAssertExpectedResponse(newUser);

        HttpEntityFactory jwtEntityFactory = login(testRestTemplate, newUser.email(), newUser.password());

        ResponseEntity<UserResponse> getMeResponseEntity = testRestTemplate.exchange(
                "/users/me",
                HttpMethod.GET,
                jwtEntityFactory.noBody(),
                new ParameterizedTypeReference<>() {}
        );

        assertUserResponseEntityHasUserDetails(getMeResponseEntity, newUser);
    }

    @Test
    void testCreateUserAndGetUserFromOtherAccount() {
        UserDetails newUser = new UserDetails(
                "fourth@example.com", "fourth-password", "Fourth", "Fourthson", EnumSet.noneOf(Authority.class)
        );

        ResponseEntity<UserResponse> createUserResponseEntity = createUserAndAssertExpectedResponse(newUser);

        UserDetails currentUser = TEST_USERS[0];

        URI userUri = createUserResponseEntity.getHeaders().getLocation();
        HttpEntityFactory jwtEntityFactory = login(testRestTemplate, currentUser.email(), currentUser.password());

        ResponseEntity<UserResponse> getUserResponseEntity = testRestTemplate.exchange(
                userUri,
                HttpMethod.GET,
                jwtEntityFactory.noBody(),
                new ParameterizedTypeReference<>() {}
        );

        assertUserResponseEntityHasUserDetails(getUserResponseEntity, newUser);
    }

    @Test
    void testCreateUserWithInvalidEmail() {
        UserDetails newUser = new UserDetails("abc", "fourth-password", "Fourth", "Fourthson", EnumSet.noneOf(Authority.class));

        CreateUserRequest request = createUserRequestFrom(newUser);

        ResponseEntity<ErrorResponse> responseEntity = testRestTemplate.exchange(
                "/users",
                HttpMethod.POST,
                new HttpEntity<>(request),
                new ParameterizedTypeReference<>() {}
        );

        assertInvalidEmailResponse(responseEntity);
    }

    @Test
    void testCreateUserWithInvalidPassword() {
        UserDetails newUser = new UserDetails("fourth@example.com", "abc", "Fourth", "Fourthson", EnumSet.noneOf(Authority.class));

        CreateUserRequest request = createUserRequestFrom(newUser);

        ResponseEntity<ErrorResponse> responseEntity = testRestTemplate.exchange(
                "/users",
                HttpMethod.POST,
                new HttpEntity<>(request),
                new ParameterizedTypeReference<>() {}
        );

        assertInvalidPasswordResponse(responseEntity);
    }

    @Test
    void testEditMeAndGetMe() {
        UserDetails user = TEST_USERS[0];

        HttpEntityFactory jwtEntityFactory = login(testRestTemplate, user.email(), user.password());

        EditUserRequest editUserRequest = new EditUserRequest("NewFirst", "NewFirstson");

        ResponseEntity<UserResponse> editMeResponse = testRestTemplate.exchange(
                "/users/me",
                HttpMethod.PUT,
                jwtEntityFactory.body(editUserRequest),
                new ParameterizedTypeReference<>() {}
        );

        UserDetails expectedEditedUser = new UserDetails(
                user.email(),
                user.password(),
                editUserRequest.firstName(),
                editUserRequest.lastName(),
                EnumSet.noneOf(Authority.class)
        );

        assertUserResponseEntityHasUserDetails(editMeResponse, expectedEditedUser);

        ResponseEntity<UserResponse> getMeResponse = testRestTemplate.exchange(
                "/users/me",
                HttpMethod.GET,
                jwtEntityFactory.noBody(),
                new ParameterizedTypeReference<>() {}
        );

        assertUserResponseEntityHasUserDetails(getMeResponse, expectedEditedUser);
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

    private void assertInvalidEmailResponse(ResponseEntity<ErrorResponse> responseEntity) {
        IntegrationTestUtil.assertErrorResponse(responseEntity, InvalidEmailException.class, HttpStatus.BAD_REQUEST);
    }

    private void assertInvalidPasswordResponse(ResponseEntity<ErrorResponse> responseEntity) {
        IntegrationTestUtil.assertErrorResponse(responseEntity, InvalidPasswordException.class, HttpStatus.BAD_REQUEST);
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
