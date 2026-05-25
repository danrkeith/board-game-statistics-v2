package com.board_game_statistics.api.users.user_authorities;

import com.board_game_statistics.api.users.User;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface UserAuthoritiesService {
    User setUserAuthorities(long userId, Set<Authority> authorities);

    Map<Authority, List<Authority>> getAuthorityPrerequisites();
}
