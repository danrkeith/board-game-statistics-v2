package com.board_game_statistics.api.constants;

import com.board_game_statistics.api.users.user_authorities.Authority;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Set;

@RequestMapping("/constants")
@RestController
public class ConstantController {
    private final ConstantService constantService;

    public ConstantController(ConstantService constantService) {
        this.constantService = constantService;
    }

    @GetMapping("/user-authorities")
    public ResponseEntity<Set<Authority>> getUserAuthorities() {
        Set<Authority> userAuthorities = constantService.getUserAuthorities();

        return ResponseEntity.ok(userAuthorities);
    }

    @GetMapping("/user-authority-prerequisites")
    public ResponseEntity<Map<Authority, Set<Authority>>> getUserAuthorityPrerequisites() {
        Map<Authority, Set<Authority>> userAuthorityPrerequisites = constantService.getUserAuthorityPrerequisites();

        return ResponseEntity.ok(userAuthorityPrerequisites);
    }
}
