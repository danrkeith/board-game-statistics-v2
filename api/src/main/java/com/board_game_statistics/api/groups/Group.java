package com.board_game_statistics.api.groups;

import com.board_game_statistics.api.group_memberships.GroupMembership;
import com.board_game_statistics.api.groups.dto.GroupResponse;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.Set;

@Table(name = "groups")
@Entity
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany(mappedBy = "group")
    private Set<GroupMembership> groupMemberships;

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Group setName(String name) {
        this.name = name;
        return this;
    }

    public GroupResponse asResponse() {
        return new GroupResponse(id, name);
    }
}
