package com.board_game_statistics.api.users;

import java.util.List;

public interface UserService {
    List<User> getUsers();

    User getUser(long id);

    void deleteUser(long id);
}
