package com.board_game_statistics.api.groups.group_memberships;

import com.board_game_statistics.api.groups.group_memberships.dto.EditGroupMembershipRequest;
import com.board_game_statistics.api.groups.group_memberships.dto.GroupMembershipResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GroupMembershipController {
    private final GroupMembershipService groupMembershipService;

    public GroupMembershipController(GroupMembershipService groupMembershipService) {
        this.groupMembershipService = groupMembershipService;
    }

    @GetMapping("/groups/{groupId}/members")
    @PreAuthorize("hasAuthority('MANAGE_GROUP_MEMBERSHIPS')")
    public ResponseEntity<List<GroupMembershipResponse>> getGroupMembershipByGroup(@PathVariable long groupId) {
        // TODO - authority check for groups outside own

        List<GroupMembership> groupMemberships = groupMembershipService.getGroupMembershipsByGroup(groupId);
        List<GroupMembershipResponse> responses = groupMemberships.stream().map(GroupMembership::asResponse).toList();

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/groups/{groupId}/members/{userId}")
    @PreAuthorize("hasAuthority('MANAGE_GROUP_MEMBERSHIPS')")
    public ResponseEntity<GroupMembershipResponse> getGroupMembership(@PathVariable long groupId, @PathVariable long userId) {
        // TODO - authority check for groups outside own

        GroupMembership groupMembership = groupMembershipService.getGroupMembership(groupId, userId);

        return ResponseEntity.ok(groupMembership.asResponse());
    }

    @PutMapping("/groups/{groupId}/members/{userId}")
    @PreAuthorize("hasAuthority('MANAGE_GROUP_MEMBERSHIPS')")
    public ResponseEntity<GroupMembershipResponse> createOrEditGroupMembership(
            @PathVariable long groupId,
            @PathVariable long userId,
            @RequestBody EditGroupMembershipRequest editGroupMembershipRequest
    ) {
        // TODO - authority check for groups outside own

        GroupMembership newGroupMembership = groupMembershipService.createOrEditGroupMembership(groupId, userId, editGroupMembershipRequest.permissions());

        return ResponseEntity.ok(newGroupMembership.asResponse());
    }

    @DeleteMapping("/groups/{groupId}/members/{userId}")
    @PreAuthorize("hasAuthority('MANAGE_GROUP_MEMBERSHIPS')")
    public ResponseEntity<?> deleteGroupMembership(@PathVariable long groupId, @PathVariable long userId) {
        // TODO - authority check for groups outside own

        groupMembershipService.deleteGroupMembership(groupId, userId);

        return ResponseEntity.noContent().build();
    }
}
