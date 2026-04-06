package com.board_game_statistics.api.groups;

import com.board_game_statistics.api.groups.dto.GroupResponse;
import com.board_game_statistics.api.users.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import java.util.Set;

@Table(name = "groups")
@Entity
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany
    private Set<User> users;

    public GroupResponse asResponse() {
        return new GroupResponse(id, name);
    }
}
