package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.users.User;
import com.board_game_statistics.api.users.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceImplTests {
    @Mock
    private UserRepository userRepository;
    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    @Test
    void testAuthenticateSuccessfully() {
        final String email = "test@example.com";
        final String password = "test-password";
        final User user = new User().setEmail(email).setPassword(password);

        when(authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                email,
                                password
                        )
                )
        ).thenReturn(any());

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.ofNullable(user));

        User authenticatedUser = authenticationService.authenticate(email, password);
        Assertions.assertEquals(user, authenticatedUser);
    }

    @Test
    void testAuthenticateUnsuccessfully() {
        when(authenticationManager.authenticate(any())).thenThrow(BadCredentialsException.class);

        Assertions.assertThrows(BadCredentialsException.class, () ->
                authenticationService.authenticate("", "")
        );
    }
}
