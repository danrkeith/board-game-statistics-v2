package com.board_game_statistics.api.constants;

import com.board_game_statistics.api.users.user_authorities.Authority;

import java.util.Map;
import java.util.Set;

public interface ConstantService {
    Set<Authority> getUserAuthorities();

    Map<Authority, Set<Authority>> getUserAuthorityPrerequisites();
}
