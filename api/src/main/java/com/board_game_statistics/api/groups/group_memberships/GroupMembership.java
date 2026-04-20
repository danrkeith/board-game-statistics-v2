package com.board_game_statistics.api.groups.group_memberships;

import com.board_game_statistics.api.groups.Group;
import com.board_game_statistics.api.groups.group_memberships.dto.GroupMembershipResponse;
import com.board_game_statistics.api.users.User;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.EnumSet;
import java.util.Set;

@Table(name = "group_memberships")
@Entity
public class GroupMembership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @Column(name = "permission", nullable = false)
    private Set<Permission> permissions = EnumSet.noneOf(Permission.class);

    public Group getGroup() {
        return group;
    }

    public GroupMembershipResponse asResponse() {
        return new GroupMembershipResponse(user.asResponse(), permissions);
    }
}
