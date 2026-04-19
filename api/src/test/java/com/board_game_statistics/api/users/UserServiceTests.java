package com.board_game_statistics.api.users;

import com.board_game_statistics.api.auth.AuthenticationService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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

    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationService authenticationService;

    @BeforeEach
    void beforeEach() {
        for (int i = 0; i < TEST_EMAILS.length; i++) {
            authenticationService.register(null, null, TEST_EMAILS[i], TEST_PASSWORDS[i]);
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
    void getUserById() {
        List<User> users = userService.getUsers();
        User expectedUser = users.getFirst();

        User actualUser = userService.getUser(expectedUser.getId());

        Assertions.assertEquals(expectedUser, actualUser);
    }

    @Test
    void editUser() {
        final long id = 1;
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
