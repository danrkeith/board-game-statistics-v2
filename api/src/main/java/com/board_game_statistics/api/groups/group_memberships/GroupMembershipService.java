package com.board_game_statistics.api.groups.group_memberships;

import com.board_game_statistics.api.groups.Group;

import java.util.List;
import java.util.Set;

public interface GroupMembershipService {
    List<GroupMembership> getGroupMembershipsByGroup(long groupId);

    List<Group> getGroupsOfUser(long userId);

    GroupMembership getGroupMembership(long groupId, long userId);

    GroupMembership createOrEditGroupMembership(long groupId, long userId, Set<Permission> permissions);

    void deleteGroupMembership(long groupId, long userId);
}
