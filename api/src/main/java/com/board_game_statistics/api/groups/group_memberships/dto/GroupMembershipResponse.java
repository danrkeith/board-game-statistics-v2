package com.board_game_statistics.api.groups.group_memberships.dto;

import com.board_game_statistics.api.groups.group_memberships.Permission;
import com.board_game_statistics.api.users.dto.UserResponse;

import java.util.Set;

public record GroupMembershipResponse(UserResponse user, Set<Permission> permissions) { }
