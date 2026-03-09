package com.board_game_statistics.api.auth.exceptions;

import com.board_game_statistics.api.exceptions.InvalidInputException;

public class InvalidPasswordException extends InvalidInputException {
    public InvalidPasswordException() {
        super("Password must be at least 8 characters");
    }
}
