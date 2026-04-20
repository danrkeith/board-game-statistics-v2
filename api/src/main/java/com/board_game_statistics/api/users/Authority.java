package com.board_game_statistics.api.users;

import org.springframework.security.core.GrantedAuthority;

public enum Authority implements GrantedAuthority {
    GRANT_AUTHORITIES,
    MANAGE_USERS,
    MANAGE_GROUPS,
    MANAGE_GROUP_MEMBERSHIPS;

    @Override
    public String getAuthority() {
        return name();
    }
}
