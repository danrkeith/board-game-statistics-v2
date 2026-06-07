package com.board_game_statistics.api.users;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@Transactional
public class UserRepositoryIntegrationTests {
    private static final String[] EMAILS = {
            "first@example.com",
            "second@example.com",
            "third@example.com"
    };

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void beforeEach() {
        for (String email : EMAILS) {
            userRepository.save(User.builder().email(email).password("test-password").build());
        }
    }

    @Test
    void testFindByOrderById() {
        List<User> users = userRepository.findByOrderById();

        Assertions.assertEquals(EMAILS.length, users.size());
        for (int i = 0; i < EMAILS.length; ++i) {
            Assertions.assertEquals(EMAILS[i], users.get(i).getEmail());
        }
    }

    @Test
    void testFindByEmail() {
        Optional<User> optionalUser = userRepository.findByEmail(EMAILS[0]);

        Assertions.assertTrue(optionalUser.isPresent());
        Assertions.assertEquals(EMAILS[0], optionalUser.get().getEmail());
    }

    @Test
    void testDoesNotFindByEmail() {
        Optional<User> optionalUser = userRepository.findByEmail("not-existent-email");

        Assertions.assertFalse(optionalUser.isPresent());
    }

    @Test
    void testExistsByEmail() {
        Assertions.assertTrue(userRepository.existsByEmail(EMAILS[0]));
    }

    @Test
    void testDoesNotExistByEmail() {
        Assertions.assertFalse(userRepository.existsByEmail("not-existent-email"));
    }
}
