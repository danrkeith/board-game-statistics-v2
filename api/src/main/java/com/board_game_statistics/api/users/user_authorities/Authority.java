package com.board_game_statistics.api.users.user_authorities;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

public enum Authority implements GrantedAuthority {
    MANAGE_USERS,
    GRANT_AUTHORITIES(MANAGE_USERS),
    MANAGE_GROUPS,
    MANAGE_GROUP_MEMBERSHIPS(MANAGE_USERS, MANAGE_GROUPS);

    @Getter
    private final Authority[] prerequisites;

    Authority(Authority... prerequisites) {
        this.prerequisites = prerequisites;
    }

    @Override
    public String getAuthority() {
        return name();
    }
}
