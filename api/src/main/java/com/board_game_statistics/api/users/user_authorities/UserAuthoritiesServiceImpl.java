package com.board_game_statistics.api.users.user_authorities;

import com.board_game_statistics.api.users.User;
import com.board_game_statistics.api.users.UserRepository;
import com.board_game_statistics.api.users.UserService;
import com.board_game_statistics.api.users.user_authorities.exceptions.MissingPrerequisiteAuthoritiesException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class UserAuthoritiesServiceImpl implements UserAuthoritiesService {
    private final UserService userService;
    private final UserRepository userRepository;

    public UserAuthoritiesServiceImpl(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @Override
    public Set<Authority> getAuthorities() {
        return Set.of(Authority.values());
    }

    @Override
    public Map<Authority, Set<Authority>> getAuthorityPrerequisites() {
        EnumMap<Authority, Set<Authority>> authorityPrerequisites = new EnumMap<>(Authority.class);

        for (Authority authority : Authority.values()) {
            authorityPrerequisites.put(authority, Set.of(authority.getPrerequisites()));
        }

        return authorityPrerequisites;
    }

    @Override
    public User setUserAuthorities(long userId, Set<Authority> authorities) {
        Map<Authority, List<Authority>> authoritiesMissingPrerequisites = getAuthoritiesMissingPrerequisites(authorities);

        if (!authoritiesMissingPrerequisites.isEmpty()) {
            throw new MissingPrerequisiteAuthoritiesException(authoritiesMissingPrerequisites);
        }

        User user = userService.getUser(userId)
                .setAuthorities(authorities);

        return userRepository.save(user);
    }

    private Map<Authority, List<Authority>> getAuthoritiesMissingPrerequisites(Set<Authority> authorities) {
        EnumMap<Authority, List<Authority>> authoritiesMissingPrerequisites = new EnumMap<>(Authority.class);

        for (Authority authority : authorities) {
            List<Authority> missingPrerequisites = new ArrayList<>();

            for (Authority prerequisite : authority.getPrerequisites()) {
                if (!authorities.contains(prerequisite)) {
                    missingPrerequisites.add(prerequisite);
                }
            }

            if (!missingPrerequisites.isEmpty()) {
                authoritiesMissingPrerequisites.put(authority, missingPrerequisites);
            }
        }

        return authoritiesMissingPrerequisites;
    }
}
