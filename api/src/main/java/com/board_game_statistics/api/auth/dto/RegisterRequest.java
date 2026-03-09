package com.board_game_statistics.api.auth.dto;

public record RegisterRequest(String firstName, String lastName, String email, String password) { }
