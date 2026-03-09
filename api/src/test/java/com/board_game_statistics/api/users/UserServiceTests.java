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
        authenticationService.register(null, null, TEST_EMAILS[0], TEST_PASSWORDS[0]);
        authenticationService.register(null, null, TEST_EMAILS[1], TEST_PASSWORDS[1]);
        authenticationService.register(null, null, TEST_EMAILS[2], TEST_PASSWORDS[2]);
    }

    @Test
    @Transactional
    void getUsers() {
        List<User> users = userService.getUsers();

        Assertions.assertEquals(3, users.size());
        Assertions.assertEquals(TEST_EMAILS[0], users.get(0).getEmail());
        Assertions.assertEquals(TEST_EMAILS[1], users.get(1).getEmail());
        Assertions.assertEquals(TEST_EMAILS[2], users.get(2).getEmail());
    }

    @Test
    @Transactional
    void getUserById() {
        List<User> users = userService.getUsers();
        User expectedUser = users.getFirst();

        User actualUser = userService.getUser(expectedUser.getId());

        Assertions.assertEquals(expectedUser, actualUser);
    }

    @Test
    @Transactional
    void deleteUser() {
        List<User> usersBeforeDelete = userService.getUsers();

        Assertions.assertEquals(3, usersBeforeDelete.size());

        userService.deleteUser(usersBeforeDelete.getFirst().getId());
        List<User> usersAfterDelete = userService.getUsers();

        Assertions.assertEquals(2, usersAfterDelete.size());
    }
}
