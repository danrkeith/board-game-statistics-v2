package com.board_game_statistics.api.groups.group_memberships.dto;

import com.board_game_statistics.api.groups.group_memberships.Permission;

import java.util.Set;

public record CreateMemberRequest(long userId, Set<Permission> permissions) { }
