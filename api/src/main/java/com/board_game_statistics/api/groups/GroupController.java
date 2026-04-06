package com.board_game_statistics.api.groups;

import com.board_game_statistics.api.groups.dto.GroupResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
