package com.board_game_statistics.api.users.user_authorities;

import com.board_game_statistics.api.users.User;
import com.board_game_statistics.api.users.dto.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
public class UserAuthoritiesController {
    private final UserAuthoritiesService userAuthoritiesService;

    UserAuthoritiesController(UserAuthoritiesService userAuthoritiesService) {
        this.userAuthoritiesService = userAuthoritiesService;
    }

    @PutMapping("users/{userId}/authorities")
    @PreAuthorize("hasAuthority('GRANT_AUTHORITIES')")
    public ResponseEntity<UserResponse> setAuthorities(@PathVariable long userId, @RequestBody Set<Authority> authorities) {
        User user = userAuthoritiesService.setAuthorities(userId, authorities);

        return ResponseEntity.ok(user.asResponse());
    }
}
