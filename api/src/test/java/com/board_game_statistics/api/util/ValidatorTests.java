package com.board_game_statistics.api.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class ValidatorTests {
    private static final String VALID_EMAIL = "email@example.com";
    private static final String INVALID_EMAIL = "not-an-email";
    private static final String VALID_PASSWORD = "test-password";
    private static final String INVALID_PASSWORD = "abc";

    @Test
    void testIsEmail() {
        boolean isEmail = Validator.isEmail(VALID_EMAIL);

        Assertions.assertTrue(isEmail);
    }

    @Test
    void testIsNotEmail() {
        boolean isEmail = Validator.isEmail(INVALID_EMAIL);

        Assertions.assertFalse(isEmail);
    }

    @Test
    void testIsValidPassword() {
        boolean isValidPassword = Validator.isValidPassword(VALID_PASSWORD);

        Assertions.assertTrue(isValidPassword);
    }

    @Test
    void testIsNotValidPassword() {
        boolean isValidPassword = Validator.isValidPassword(INVALID_PASSWORD);

        Assertions.assertFalse(isValidPassword);
    }
}
