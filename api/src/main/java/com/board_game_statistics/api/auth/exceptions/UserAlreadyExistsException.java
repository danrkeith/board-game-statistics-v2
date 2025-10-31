package com.board_game_statistics.api.auth.exceptions;

import com.board_game_statistics.api.exceptions.InvalidInputException;

public class UserAlreadyExistsException extends InvalidInputException {
    public UserAlreadyExistsException() {
        super("A user already exists with that email");
    }
}
