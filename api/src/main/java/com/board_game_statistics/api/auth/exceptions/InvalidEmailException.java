package com.board_game_statistics.api.auth.exceptions;

import com.board_game_statistics.api.exceptions.InvalidInputException;

public class InvalidEmailException extends InvalidInputException {
    public InvalidEmailException() {
        super("Invalid email");
    }
}
