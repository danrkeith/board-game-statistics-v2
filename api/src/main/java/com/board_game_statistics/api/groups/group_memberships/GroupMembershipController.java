package com.board_game_statistics.api.groups.group_memberships;

import com.board_game_statistics.api.groups.group_memberships.dto.CreateMemberRequest;
import com.board_game_statistics.api.groups.group_memberships.dto.GroupMembershipResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class GroupMembershipController {
    private final GroupMembershipService groupMembershipService;

    public GroupMembershipController(GroupMembershipService groupMembershipService) {
        this.groupMembershipService = groupMembershipService;
    }

    @GetMapping("/groups/{groupId}/members")
    @PreAuthorize("hasAuthority('MANAGE_GROUP_MEMBERSHIPS')")
    public ResponseEntity<List<GroupMembershipResponse>> getGroupMembersByGroup(@PathVariable long groupId) {
        List<GroupMembership> groupMemberships = groupMembershipService.getGroupMembershipsByGroup(groupId);
        List<GroupMembershipResponse> responses = groupMemberships.stream().map(GroupMembership::asResponse).toList();

        return ResponseEntity.ok(responses);
    }

    @PostMapping("/groups/{groupId}/members")
    @PreAuthorize("hasAuthority('MANAGE_GROUP_MEMBERSHIPS')")
    public ResponseEntity<?> createMember(@PathVariable long groupId, @RequestBody CreateMemberRequest createMemberRequest) {
        GroupMembership groupMembership = groupMembershipService.createMembership(groupId, createMemberRequest.userId(), createMemberRequest.permissions());

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/groups/{groupId}/members/{userId}")
                .buildAndExpand(groupMembership.getGroup().getId(), groupMembership.getUser().getId())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(groupMembership.asResponse());
    }
}
