package com.board_game_statistics.api.util;

public class Validator {
    public static boolean isEmail(String email) {
        return email.matches("^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$");
    }

    public static boolean isValidPassword(String password) {
        return password.length() >= 8;
    }
}
