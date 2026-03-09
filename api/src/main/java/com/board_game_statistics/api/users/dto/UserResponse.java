package com.board_game_statistics.api.users.dto;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public record UserResponse(long id, String email, String firstName, String lastName, Collection<? extends GrantedAuthority> authorities) { }
