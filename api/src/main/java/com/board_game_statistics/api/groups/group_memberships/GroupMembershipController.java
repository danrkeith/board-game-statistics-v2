package com.board_game_statistics.api.groups.group_memberships;

import com.board_game_statistics.api.groups.group_memberships.dto.GroupMembershipResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public ResponseEntity<List<GroupMembershipResponse>> getGroupMembershipsByGroupId(@PathVariable long groupId) {
        List<GroupMembership> groupMemberships = groupMembershipService.getGroupMembershipsByGroupId(groupId);
        List<GroupMembershipResponse> responses = groupMemberships.stream().map(GroupMembership::asResponse).toList();

        return ResponseEntity.ok(responses);
    }
}
