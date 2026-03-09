package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.users.User;

public interface AuthenticationService {
    User register(String firstName, String lastName, String email, String password);

    User authenticate(String email, String password);
}
