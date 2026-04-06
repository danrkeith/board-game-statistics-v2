package com.board_game_statistics.api.users;

import com.board_game_statistics.api.users.dto.EditUserRequest;
import com.board_game_statistics.api.users.dto.UserResponse;
import com.board_game_statistics.api.users.exceptions.DeleteSelfException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public ResponseEntity<List<UserResponse>> getUsers() {
        List<User> users = userService.getUsers();
        List<UserResponse> userResponses = users.stream().map(User::asResponse).toList();

        return ResponseEntity.ok(userResponses);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMe(@AuthenticationPrincipal User user) {
        UserResponse userResponse = user.asResponse();

        return ResponseEntity.ok(userResponse);
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> editMe(@AuthenticationPrincipal User user, @RequestBody EditUserRequest editUserRequest) {
        User newUser = userService.editUser(user.getId(), editUserRequest.firstName(), editUserRequest.lastName());

        return ResponseEntity.ok(newUser.asResponse());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('MANAGE_USERS')")
    public ResponseEntity<UserResponse> getUser(@PathVariable long id) {
        User user = userService.getUser(id);

        return ResponseEntity.ok(user.asResponse());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('MANAGE_USERS')")
    public ResponseEntity<UserResponse> editUser(@PathVariable long id, @RequestBody EditUserRequest editUserRequest) {
        User newUser = userService.editUser(id, editUserRequest.firstName(), editUserRequest.lastName());

        return ResponseEntity.ok(newUser.asResponse());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('MANAGE_USERS')")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal User user, @PathVariable long id) {
        if (user.getId() == id) {
            throw new DeleteSelfException();
        }

        userService.deleteUser(id);

        return ResponseEntity.noContent().build();
    }
}
