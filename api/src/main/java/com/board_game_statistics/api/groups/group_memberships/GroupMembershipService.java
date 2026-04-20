package com.board_game_statistics.api.groups.group_memberships;

import com.board_game_statistics.api.groups.Group;

import java.util.List;

public interface GroupMembershipService {
    List<GroupMembership> getGroupMembershipsByGroupId(long groupId);

    List<Group> getGroupsOfUser(long userId);
}
