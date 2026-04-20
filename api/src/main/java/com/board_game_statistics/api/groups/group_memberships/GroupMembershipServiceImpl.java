package com.board_game_statistics.api.groups.group_memberships;

import com.board_game_statistics.api.groups.Group;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupMembershipServiceImpl implements GroupMembershipService {
    private final GroupMembershipRepository groupMembershipRepository;

    public GroupMembershipServiceImpl(GroupMembershipRepository groupMembershipRepository) {
        this.groupMembershipRepository = groupMembershipRepository;
    }

    @Override
    public List<GroupMembership> getGroupMembershipsByGroupId(long groupId) {
        return groupMembershipRepository.findAllByGroupId(groupId);
    }

    @Override
    public List<Group> getGroupsOfUser(long userId) {
        return groupMembershipRepository.findAllByUserId(userId).stream().map(GroupMembership::getGroup).toList();
    }
}
