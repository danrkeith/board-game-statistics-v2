package com.board_game_statistics.api.users.user_authorities;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RequestMapping("/users/{userId}/authorities")
@RestController
public class UserAuthoritiesController {
    private final UserAuthoritiesService userAuthoritiesService;

    UserAuthoritiesController(UserAuthoritiesService userAuthoritiesService) {
        this.userAuthoritiesService = userAuthoritiesService;
    }

    @GetMapping
    public ResponseEntity<Set<Authority>> getUserAuthorities(@PathVariable long userId) {
        Set<Authority> userAuthorities = userAuthoritiesService.getUserAuthorities(userId);

        return ResponseEntity.ok(userAuthorities);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('GRANT_AUTHORITIES')")
    public ResponseEntity<Set<Authority>> setUserAuthorities(@PathVariable long userId, @RequestBody Set<Authority> authorities) {
        Set<Authority> userAuthorities = userAuthoritiesService.setUserAuthorities(userId, authorities);

        return ResponseEntity.ok(userAuthorities);
    }
}
