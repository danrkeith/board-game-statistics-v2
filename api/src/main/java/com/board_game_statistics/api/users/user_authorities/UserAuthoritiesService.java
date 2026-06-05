package com.board_game_statistics.api.users.user_authorities;

import java.util.Set;

public interface UserAuthoritiesService {
    Set<Authority> getUserAuthorities(long userId);

    Set<Authority> setUserAuthorities(long userId, Set<Authority> authorities);
}
