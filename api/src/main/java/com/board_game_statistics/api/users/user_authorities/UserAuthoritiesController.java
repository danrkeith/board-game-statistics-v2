package com.board_game_statistics.api.users.user_authorities;

import com.board_game_statistics.api.users.User;
import com.board_game_statistics.api.users.dto.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
public class UserAuthoritiesController {
    private final UserAuthoritiesService userAuthoritiesService;

    UserAuthoritiesController(UserAuthoritiesService userAuthoritiesService) {
        this.userAuthoritiesService = userAuthoritiesService;
    }

    @GetMapping("/users/authorities/prerequisites")
    @PreAuthorize("hasAuthority('GRANT_AUTHORITIES')")
    public ResponseEntity<Map<Authority, List<Authority>>> getAuthorityPrerequisites() {
        Map<Authority, List<Authority>> authorityPrerequisites = userAuthoritiesService.getAuthorityPrerequisites();

        return ResponseEntity.ok(authorityPrerequisites);
    }

    @PutMapping("/users/{userId}/authorities")
    @PreAuthorize("hasAuthority('GRANT_AUTHORITIES')")
    public ResponseEntity<UserResponse> setUserAuthorities(@PathVariable long userId, @RequestBody Set<Authority> authorities) {
        User user = userAuthoritiesService.setUserAuthorities(userId, authorities);

        return ResponseEntity.ok(user.asResponse());
    }
}
