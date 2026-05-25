package com.board_game_statistics.api.users;

import com.board_game_statistics.api.users.exceptions.InvalidEmailException;
import com.board_game_statistics.api.users.exceptions.InvalidPasswordException;
import com.board_game_statistics.api.users.exceptions.MissingPrerequisiteAuthoritiesException;
import com.board_game_statistics.api.users.exceptions.UserAlreadyExistsException;
import com.board_game_statistics.api.exceptions.ResourceNotFoundException;
import com.board_game_statistics.api.util.Validator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findByOrderById();
    }

    @Override
    public User createUser(String email, String password, String firstName, String lastName) {
        if (userRepository.existsByEmail(email)) {
            throw new UserAlreadyExistsException();
        }

        if (!Validator.isEmail(email)) {
            throw new InvalidEmailException();
        }

        if (!Validator.isValidPassword(password)) {
            throw new InvalidPasswordException();
        }

        User user = new User()
                .setEmail(email)
                .setPassword(passwordEncoder.encode(password))
                .setFirstName(firstName)
                .setLastName(lastName);

        return userRepository.save(user);
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
        User user = getUser(id);

        userRepository.delete(user);
    }

    @Override
    public User setAuthorities(long id, Set<Authority> authorities) {
        Map<Authority, List<Authority>> authoritiesMissingPrerequisites = getAuthoritiesMissingPrerequisites(authorities);

        if (!authoritiesMissingPrerequisites.isEmpty()) {
            throw new MissingPrerequisiteAuthoritiesException(authoritiesMissingPrerequisites);
        }

        User user = getUser(id)
                .setAuthorities(authorities);

        return userRepository.save(user);
    }

    private Map<Authority, List<Authority>> getAuthoritiesMissingPrerequisites(Set<Authority> authorities) {
        EnumMap<Authority, List<Authority>> authoritiesMissingPrerequisites = new EnumMap<>(Authority.class);

        for (Authority authority : authorities) {
            List<Authority> missingPrerequisites = new ArrayList<>();

            for (Authority prerequisite : authority.getPrerequisites()) {
                if (!authorities.contains(prerequisite)) {
                    missingPrerequisites.add(prerequisite);
                }
            }

            if (!missingPrerequisites.isEmpty()) {
                authoritiesMissingPrerequisites.put(authority, missingPrerequisites);
            }
        }

        return authoritiesMissingPrerequisites;
    }
}
