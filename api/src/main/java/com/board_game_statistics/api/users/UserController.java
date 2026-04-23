package com.board_game_statistics.api.users;

import com.board_game_statistics.api.groups.Group;
import com.board_game_statistics.api.groups.dto.GroupResponse;
import com.board_game_statistics.api.groups.group_memberships.GroupMembershipService;
import com.board_game_statistics.api.users.dto.CreateUserRequest;
import com.board_game_statistics.api.users.dto.EditUserRequest;
import com.board_game_statistics.api.users.dto.UserResponse;
import com.board_game_statistics.api.users.exceptions.DeleteSelfException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Set;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    private final GroupMembershipService groupMembershipService;

    public UserController(UserService userService, GroupMembershipService groupMembershipService) {
        this.userService = userService;
        this.groupMembershipService = groupMembershipService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('MANAGE_USERS')")
    public ResponseEntity<List<UserResponse>> getUsers() {
        List<User> users = userService.getUsers();

        List<UserResponse> userResponses = users.stream().map(User::asResponse).toList();
        return ResponseEntity.ok(userResponses);
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody CreateUserRequest createUserRequest) {
        User user = userService.createUser(createUserRequest.email(), createUserRequest.password(), createUserRequest.firstName(), createUserRequest.lastName());

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/users/{id}")
                .buildAndExpand(user.getId())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(user.asResponse());
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

    @GetMapping("/me/groups")
    public ResponseEntity<List<GroupResponse>> getMyGroups(@AuthenticationPrincipal User user) {
        List<Group> groups = groupMembershipService.getGroupsOfUser(user.getId());

        List<GroupResponse> groupResponses = groups.stream().map(Group::asResponse).toList();
        return ResponseEntity.ok(groupResponses);
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

    @PutMapping("/{id}/authorities")
    @PreAuthorize("hasAuthority('MANAGE_USERS')")
    public ResponseEntity<UserResponse> setAuthorities(@PathVariable long id, @RequestBody Set<Authority> authorities) {
        User user = userService.setAuthorities(id, authorities);

        return ResponseEntity.ok(user.asResponse());
    }

    @GetMapping("/{id}/groups")
    // TODO - more granular authorities for viewing as compared to editing
    @PreAuthorize("hasAuthority('MANAGE_USERS') and hasAuthority('MANAGE_GROUPS') and hasAuthority('MANAGE_GROUP_MEMBERSHIPS')")
    public ResponseEntity<List<GroupResponse>> getUserGroups(@PathVariable long id) {
        List<Group> groups = groupMembershipService.getGroupsOfUser(id);

        List<GroupResponse> groupResponses = groups.stream().map(Group::asResponse).toList();
        return ResponseEntity.ok(groupResponses);
    }
}
