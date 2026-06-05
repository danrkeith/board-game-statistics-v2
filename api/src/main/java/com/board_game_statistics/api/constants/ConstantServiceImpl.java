package com.board_game_statistics.api.constants;

import com.board_game_statistics.api.users.user_authorities.Authority;
import org.springframework.stereotype.Service;

import java.util.EnumMap;
import java.util.Map;
import java.util.Set;

@Service
public class ConstantServiceImpl implements ConstantService {
    @Override
    public Set<Authority> getUserAuthorities() {
        return Set.of(Authority.values());
    }

    @Override
    public Map<Authority, Set<Authority>> getUserAuthorityPrerequisites() {
        EnumMap<Authority, Set<Authority>> userAuthorityPrerequisites = new EnumMap<>(Authority.class);

        for (Authority authority : Authority.values()) {
            userAuthorityPrerequisites.put(authority, Set.of(authority.getPrerequisites()));
        }

        return userAuthorityPrerequisites;
    }
}
