package com.board_game_statistics.api.users;

import org.springframework.security.core.GrantedAuthority;

public enum Authority implements GrantedAuthority {
    MANAGE_USERS;

    @Override
    public String getAuthority() {
        return name();
    }
}
