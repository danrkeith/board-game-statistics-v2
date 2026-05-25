package com.board_game_statistics.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public record ErrorResponse(String error, String message) {
    public static ResponseEntity<ErrorResponse> entityFrom(Exception e, HttpStatus status) {
        return ResponseEntity
                .status(status)
                .body(new ErrorResponse(
                        e.getClass().getSimpleName(),
                        e.getMessage()
                ));
    }
}
