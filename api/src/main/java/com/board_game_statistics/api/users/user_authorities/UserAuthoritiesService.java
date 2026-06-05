package com.board_game_statistics.api.users.user_authorities;

import com.board_game_statistics.api.users.User;

import java.util.Set;

public interface UserAuthoritiesService {
    Set<Authority> getUserAuthorities(long userId);

    User setUserAuthorities(long userId, Set<Authority> authorities);
}
