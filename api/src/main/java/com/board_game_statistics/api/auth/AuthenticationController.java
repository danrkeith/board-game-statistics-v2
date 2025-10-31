package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.auth.dto.LoginRequest;
import com.board_game_statistics.api.auth.dto.LoginResponse;
import com.board_game_statistics.api.auth.dto.RegisterRequest;
import com.board_game_statistics.api.users.User;
import com.board_game_statistics.api.users.dto.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    public AuthenticationController(
            AuthenticationService authenticationService,
            JwtService jwtService
    ) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest registerRequest) {
        User registeredUser = authenticationService.register(registerRequest.email(), registerRequest.password());
        UserResponse registeredUserResponse = registeredUser.asResponse();

        return ResponseEntity.ok(registeredUserResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        User authenticatedUser = authenticationService.authenticate(loginRequest.email(), loginRequest.password());

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}
