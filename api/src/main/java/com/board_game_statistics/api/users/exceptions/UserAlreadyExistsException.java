package com.board_game_statistics.api.users.exceptions;

import com.board_game_statistics.api.exceptions.ResourceConflictException;

public class UserAlreadyExistsException extends ResourceConflictException {
    public UserAlreadyExistsException() {
        super("A user already exists with that email");
    }
}
