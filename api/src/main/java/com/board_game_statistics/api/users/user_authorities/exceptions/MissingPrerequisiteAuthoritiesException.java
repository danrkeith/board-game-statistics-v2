package com.board_game_statistics.api.users.user_authorities.exceptions;

import com.board_game_statistics.api.exceptions.InvalidInputException;
import com.board_game_statistics.api.users.user_authorities.Authority;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class MissingPrerequisiteAuthoritiesException extends InvalidInputException {
    public MissingPrerequisiteAuthoritiesException(Map<Authority, List<Authority>> authoritiesMissingPrerequisites) {
        super(
                "The submitted authorities are missing the following prerequisites:" +
                        authoritiesMissingPrerequisites.keySet().stream().map(
                                authority -> "\n\t- " + authority + " requires " +
                                        authoritiesMissingPrerequisites.get(authority).stream().map(Authority::toString).collect(Collectors.joining(", "))
                        ).collect(Collectors.joining())
        );
    }
}
