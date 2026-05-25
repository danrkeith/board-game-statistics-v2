package com.board_game_statistics.api.users.exceptions;

import com.board_game_statistics.api.exceptions.InvalidInputException;
import com.board_game_statistics.api.users.Authority;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class MissingPrerequisiteAuthoritiesException extends InvalidInputException {
    public MissingPrerequisiteAuthoritiesException(Map<Authority, List<Authority>> authoritiesMissingPrerequisites) {
        super(
                "The authorities submitted are missing the following prerequisites:" +
                        authoritiesMissingPrerequisites.keySet().stream().map(
                                authority -> "\n\t- " + authority + " requires " +
                                        authoritiesMissingPrerequisites.get(authority).stream().map(Authority::toString).collect(Collectors.joining(", "))
                        ).collect(Collectors.joining())
        );
    }
}
