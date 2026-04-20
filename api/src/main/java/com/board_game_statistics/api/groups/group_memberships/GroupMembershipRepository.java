package com.board_game_statistics.api.groups.group_memberships;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupMembershipRepository extends JpaRepository<GroupMembership, Long> {
    List<GroupMembership> findAllByGroupId(Long groupId);

    List<GroupMembership> findAllByUserId(Long userId);
}
