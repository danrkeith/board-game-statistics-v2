package com.board_game_statistics.api.groups;

import java.util.List;

public interface GroupService {
    List<Group> getGroups();

    Group getGroup(long id);

    Group createGroup(String name);
}
