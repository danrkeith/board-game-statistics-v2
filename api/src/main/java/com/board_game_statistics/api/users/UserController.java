package com.board_game_statistics.api.users;

import com.board_game_statistics.api.users.dto.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('MANAGE_USERS')")
    public ResponseEntity<List<UserResponse>> users() {
        List<User> users = userService.getUsers();
        List<UserResponse> userResponses = users.stream().map(User::asResponse).toList();

        return ResponseEntity.ok(userResponses);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(@AuthenticationPrincipal User user) {
        UserResponse userResponse = user.asResponse();

        return ResponseEntity.ok(userResponse);
    }
}
