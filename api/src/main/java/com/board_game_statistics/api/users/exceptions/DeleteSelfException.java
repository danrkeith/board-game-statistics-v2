package com.board_game_statistics.api.users.exceptions;

import com.board_game_statistics.api.exceptions.ForbiddenOperationException;

public class DeleteSelfException extends ForbiddenOperationException {
    public DeleteSelfException() {
        super("Cannot delete self");
    }
}
