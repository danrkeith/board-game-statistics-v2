package com.board_game_statistics.api.users;

import java.util.List;
import java.util.Set;

public interface UserService {
    List<User> getUsers();

    User getUser(long id);

    User editUser(long id, String firstName, String lastName);

    void deleteUser(long id);

    User setAuthorities(long id, Set<Authority> authorities);
}
