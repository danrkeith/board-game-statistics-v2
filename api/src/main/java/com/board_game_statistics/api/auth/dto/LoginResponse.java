package com.board_game_statistics.api.auth.dto;

public record LoginResponse(String jwt, long expiresIn) { }
