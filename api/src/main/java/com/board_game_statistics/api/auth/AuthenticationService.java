package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.users.User;

public interface AuthenticationService {
    User authenticate(String email, String password);
}
