package com.board_game_statistics.api.groups.group_memberships;

import com.board_game_statistics.api.exceptions.ResourceNotFoundException;
import com.board_game_statistics.api.groups.Group;
import com.board_game_statistics.api.groups.GroupService;
import com.board_game_statistics.api.users.User;
import com.board_game_statistics.api.users.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class GroupMembershipServiceImpl implements GroupMembershipService {
    private final UserService userService;
    private final GroupService groupService;
    private final GroupMembershipRepository groupMembershipRepository;

    public GroupMembershipServiceImpl(
            UserService userService,
            GroupService groupService,
            GroupMembershipRepository groupMembershipRepository) {
        this.userService = userService;
        this.groupService = groupService;
        this.groupMembershipRepository = groupMembershipRepository;
    }

    @Override
    public List<GroupMembership> getGroupMembershipsByGroup(long groupId) {
        return groupMembershipRepository.findByGroupIdOrderByUserId(groupId);
    }

    @Override
    public GroupMembership getGroupMembership(long groupId, long userId) {
        return groupMembershipRepository.findByGroupIdAndUserId(groupId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Group membership does not exist"));
    }

    @Override
    public List<Group> getGroupsOfUser(long userId) {
        return groupMembershipRepository.findByUserIdOrderByGroupId(userId).stream().map(GroupMembership::getGroup).toList();
    }

    @Override
    public GroupMembership createMembership(long groupId, long userId, Set<Permission> permissions) {
        User user = userService.getUser(userId);
        Group group = groupService.getGroup(groupId);

        GroupMembership groupMembership = new GroupMembership()
                .setUser(user)
                .setGroup(group)
                .setPermissions(permissions);

        return groupMembershipRepository.save(groupMembership);
    }
}
