package com.board_game_statistics.api.users;

import com.board_game_statistics.api.exceptions.ResourceNotFoundException;
import com.board_game_statistics.api.users.exceptions.InvalidEmailException;
import com.board_game_statistics.api.users.exceptions.InvalidPasswordException;
import com.board_game_statistics.api.users.exceptions.UserAlreadyExistsException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {
    private UserService userService;

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void beforeEach() {
        userService = new UserServiceImpl(userRepository, passwordEncoder);
    }

    @Test
    void testGetUsers() {
        List<User> users = List.of(
                User.builder().email("first@example.com").password("first-password").build(),
                User.builder().email("second@example.com").password("second-password").build()
        );

        Mockito.when(userRepository.findByOrderById()).thenReturn(users);

        Assertions.assertEquals(users, userService.getUsers());
    }

    @Test
    void testCreateUser() {
        final String password = "test-password";
        final String encodedPassword = "encoded-test-password";

        User user = User.builder()
                .email("test@example.com")
                .password(encodedPassword)
                .firstName("test-first-name")
                .lastName("test-last-name")
                .build();

        Mockito.when(userRepository.existsByEmail(user.getEmail()))
                .thenReturn(false);

        Mockito.when(passwordEncoder.encode(password))
                .thenReturn(encodedPassword);

        userService.createUser(
                user.getEmail(),
                password,
                user.getFirstName(),
                user.getLastName()
        );

        Mockito.verify(userRepository)
                .save(ArgumentMatchers.eq(user));
    }

    @Test
    void testCreateUserWhereUserAlreadyExists() {
        final String email = "test@example.com";

        Mockito.when(userRepository.existsByEmail(email))
                .thenReturn(true);

        Assertions.assertThrows(UserAlreadyExistsException.class, () ->
                userService.createUser(email, "test-password", "test-firstName", "test-lastName")
        );
    }

    @Test
    void testCreateUserWithInvalidEmail() {
        final String email = "test-example.com";

        Mockito.when(userRepository.existsByEmail(email))
                .thenReturn(false);

        Assertions.assertThrows(InvalidEmailException.class, () ->
                userService.createUser(email, "test-password", "test-firstName", "test-lastName")
        );
    }

    @Test
    void testCreateUserWithInvalidPassword() {
        final String email = "test@example.com";

        Mockito.when(userRepository.existsByEmail(email))
                .thenReturn(false);

        Assertions.assertThrows(InvalidPasswordException.class, () ->
                userService.createUser(email, "invalid", "test-firstName", "test-lastName")
        );
    }

    @Test
    void testGetUser() {
        final long id = 1;
        final User user = User.builder().email("test@example.com").password("test-password").build();

        Mockito.when(userRepository.findById(id))
                .thenReturn(Optional.of(user));

        Assertions.assertEquals(user, userService.getUser(id));
    }

    @Test
    void testGetUserWithInvalidId() {
        final long id = 1;

        Mockito.when(userRepository.findById(id))
                .thenReturn(Optional.empty());

        ResourceNotFoundException e = Assertions.assertThrows(ResourceNotFoundException.class, () ->
                userService.getUser(id)
        );
        Assertions.assertEquals("User does not exist", e.getMessage());
    }

    @Test
    void testEditUser() {
        final long id = 1;
        final String email = "test@example.com";
        final String password = "test-password";
        final User initialUser = User.builder()
                .email(email)
                .password(password)
                .build();

        Mockito.when(userRepository.findById(id))
                .thenReturn(Optional.of(initialUser));

        final String firstName = "firstName";
        final String lastName = "lastName";
        final User editedUser = User.builder()
                .email(email)
                .password(password)
                .firstName(firstName)
                .lastName(lastName)
                .build();

        userService.editUser(id, firstName, lastName);

        Mockito.verify(userRepository)
                .save(ArgumentMatchers.eq(editedUser));
    }

    @Test
    void testDeleteUser() {
        final long id = 1;
        final User user = User.builder()
                .email("test@example.com")
                .password("test-password")
                .build();

        Mockito.when(userRepository.findById(id))
                .thenReturn(Optional.of(user));

        userService.deleteUser(id);

        Mockito.verify(userRepository)
                .delete(user);
    }
}
