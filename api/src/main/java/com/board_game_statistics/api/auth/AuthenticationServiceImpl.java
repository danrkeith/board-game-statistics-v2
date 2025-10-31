package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.auth.exceptions.UserAlreadyExistsException;
import com.board_game_statistics.api.users.User;
import com.board_game_statistics.api.users.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public User register(String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new UserAlreadyExistsException();
        }

        User user = new User()
                .setEmail(email)
                .setPassword(passwordEncoder.encode(password));

        return userRepository.save(user);
    }

    @Override
    public User authenticate(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        password
                )
        );

        return userRepository.findByEmail(email)
                .orElseThrow();
    }
}
