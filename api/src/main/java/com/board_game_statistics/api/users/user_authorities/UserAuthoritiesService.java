package com.board_game_statistics.api.users.user_authorities;

import com.board_game_statistics.api.users.User;

import java.util.Set;

public interface UserAuthoritiesService {
    User setAuthorities(long id, Set<Authority> authorities);
}
