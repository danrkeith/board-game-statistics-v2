package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.users.User;
import com.board_game_statistics.api.users.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceImplTests {
    @Mock
    private UserRepository userRepository;
    @Mock
    private AuthenticationManager authenticationManager;

    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        authenticationService = new AuthenticationServiceImpl(userRepository, authenticationManager);
    }

    @Test
    void testAuthenticateSuccessfully() {
        final String email = "test@example.com";
        final String password = "test-password";
        final User user = User.builder().email(email).password(password).build();

        Mockito.when(authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        password
                ))
        ).thenReturn(ArgumentMatchers.any());

        Mockito.when(userRepository.findByEmail(email))
                .thenReturn(Optional.ofNullable(user));

        User authenticatedUser = authenticationService.authenticate(email, password);
        Assertions.assertEquals(user, authenticatedUser);
    }

    @Test
    void testAuthenticateUnsuccessfully() {
        Mockito.when(authenticationManager.authenticate(ArgumentMatchers.any())).thenThrow(BadCredentialsException.class);

        Assertions.assertThrows(BadCredentialsException.class, () ->
                authenticationService.authenticate("", "")
        );
    }
}
