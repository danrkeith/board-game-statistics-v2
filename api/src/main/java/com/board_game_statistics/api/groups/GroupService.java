package com.board_game_statistics.api.groups;

import java.util.List;

public interface GroupService {
    List<Group> getGroups();

    Group createGroup(String name);

    Group getGroup(long id);

    Group editGroup(long id, String name);

    void deleteGroup(long id);
}
