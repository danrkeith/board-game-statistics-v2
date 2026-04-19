package com.board_game_statistics.api.groups;

import com.board_game_statistics.api.groups.dto.CreateGroupRequest;
import com.board_game_statistics.api.groups.dto.GroupResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RequestMapping("/groups")
@RestController
public class GroupController {
    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('MANAGE_GROUPS')")
    public ResponseEntity<List<GroupResponse>> getAllGroups() {
        List<Group> groups = groupService.getGroups();
        List<GroupResponse> groupsResponses = groups.stream().map(Group::asResponse).toList();

        return ResponseEntity.ok(groupsResponses);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('MANAGE_GROUPS')")
    public ResponseEntity<?> createGroup(@RequestBody CreateGroupRequest createGroupRequest) {
        Group group = groupService.createGroup(createGroupRequest.name());

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/groups/{id}")
                .buildAndExpand(group.getId())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(group.asResponse());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('MANAGE_GROUPS')")
    public ResponseEntity<GroupResponse> getGroup(@PathVariable long id) {
        Group group = groupService.getGroup(id);

        return ResponseEntity.ok(group.asResponse());
    }
}
