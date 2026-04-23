package com.board_game_statistics.api.users;

import com.board_game_statistics.api.users.exceptions.InvalidEmailException;
import com.board_game_statistics.api.users.exceptions.InvalidPasswordException;
import com.board_game_statistics.api.users.exceptions.UserAlreadyExistsException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class UserServiceTests {
    private static final String[] TEST_EMAILS = {
            "test0@example.com",
            "test1@example.com",
            "test2@example.com"
    };
    private static final String[] TEST_PASSWORDS = {
            "test0-password",
            "test1-password",
            "test2-password"
    };
    private static final String TEST_EMAIL_FOR_CREATE = "test-create@example.com";
    private static final String TEST_PASSWORD_FOR_CREATE = "test-create-password";
    private static final String INVALID_EMAIL = "not-an-email";
    private static final String INVALID_PASSWORD = "abc";

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void beforeEach() {
        for (int i = 0; i < TEST_EMAILS.length; i++) {
            userRepository.save(new User()
                    .setEmail(TEST_EMAILS[i])
                    .setPassword(passwordEncoder.encode(TEST_PASSWORDS[i]))
            );
        }
    }

    @Test
    void getUsers() {
        List<User> users = userService.getUsers();

        Assertions.assertEquals(TEST_EMAILS.length, users.size());
        for (int i = 0; i < TEST_EMAILS.length; i++) {
            Assertions.assertEquals(TEST_EMAILS[i], users.get(i).getEmail());
        }
    }

    @Test
    @Transactional
    void testCreateUser() {
        User savedUser = userService.createUser(TEST_EMAIL_FOR_CREATE, TEST_PASSWORD_FOR_CREATE, null, null);

        Assertions.assertEquals(TEST_EMAIL_FOR_CREATE, savedUser.getEmail());
    }

    @Test
    @Transactional
    void testCreateUserTwice() {
        userService.createUser(TEST_EMAIL_FOR_CREATE, TEST_PASSWORD_FOR_CREATE, null, null);

        Assertions.assertThrows(UserAlreadyExistsException.class, () ->
                userService.createUser(TEST_EMAIL_FOR_CREATE, TEST_PASSWORD_FOR_CREATE, null, null)
        );
    }

    @Test
    @Transactional
    void testCreateUserInvalidEmail() {
        Assertions.assertThrows(InvalidEmailException.class, () ->
                userService.createUser(INVALID_EMAIL, TEST_PASSWORD_FOR_CREATE, null, null)
        );
    }

    @Test
    @Transactional
    void testCreateUserInvalidPassword() {
        Assertions.assertThrows(InvalidPasswordException.class, () ->
                userService.createUser(TEST_EMAIL_FOR_CREATE, INVALID_PASSWORD, null, null)
        );
    }

    @Test
    void getUserById() {
        List<User> users = userService.getUsers();
        User expectedUser = users.getFirst();

        User actualUser = userService.getUser(expectedUser.getId());

        Assertions.assertEquals(expectedUser, actualUser);
    }

    @Test
    void editUser() {
        final long id = userService.createUser(TEST_EMAIL_FOR_CREATE, TEST_PASSWORD_FOR_CREATE, null, null).getId();
        final String firstName = "John";
        final String lastName = "Smith";

        User beforeUser = userService.getUser(id);
        Assertions.assertNull(beforeUser.getFirstName());
        Assertions.assertNull(beforeUser.getLastName());

        User afterUser = userService.editUser(id, firstName, lastName);
        User verifyAfterUser = userService.getUser(id);

        Assertions.assertEquals(firstName, afterUser.getFirstName());
        Assertions.assertEquals(lastName, afterUser.getLastName());
        Assertions.assertEquals(afterUser, verifyAfterUser);
    }

    @Test
    void deleteUser() {
        List<User> usersBeforeDelete = userService.getUsers();

        Assertions.assertEquals(TEST_EMAILS.length, usersBeforeDelete.size());

        userService.deleteUser(usersBeforeDelete.getFirst().getId());
        List<User> usersAfterDelete = userService.getUsers();

        Assertions.assertEquals(TEST_EMAILS.length - 1, usersAfterDelete.size());
    }
}
