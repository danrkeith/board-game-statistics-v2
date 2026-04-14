package com.board_game_statistics.api.users;

import com.board_game_statistics.api.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAllByOrderById();
    }

    @Override
    public User getUser(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist"));
    }

    @Override
    public User editUser(long id, String firstName, String lastName) {
        User user = getUser(id)
                .setFirstName(firstName)
                .setLastName(lastName);

        return userRepository.save(user);
    }

    @Override
    public void deleteUser(long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist"));

        userRepository.delete(user);
    }

    @Override
    public User setAuthorities(long id, Set<Authority> authorities) {
        User user = getUser(id)
                .setAuthorities(authorities);

        return userRepository.save(user);
    }
}
