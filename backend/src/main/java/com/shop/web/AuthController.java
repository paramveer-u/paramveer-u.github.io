package com.shop.web;

import com.shop.model.User;
import com.shop.repo.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    private final BCryptPasswordEncoder encoder;

    public AuthController(UserRepository users, BCryptPasswordEncoder encoder) {
        this.users = users;
        this.encoder = encoder;
    }

    record RegisterReq(@NotBlank String name, @Email @NotBlank String email, @Size(min = 6) String password) {}
    record LoginReq(@NotBlank String email, @NotBlank String password) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterReq r) {
        String email = r.email().toLowerCase();
        if (users.findByEmail(email).isPresent())
            return ResponseEntity.status(409).body(Map.of("message", "This email is already registered. Sign in instead."));
        User u = new User();
        u.setName(r.name());
        u.setEmail(email);
        u.setPasswordHash(encoder.encode(r.password()));
        users.save(u);
        return ResponseEntity.ok(Map.of("message", "Account created"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginReq r) {
        return users.findByEmail(r.email().toLowerCase())
            .filter(u -> encoder.matches(r.password(), u.getPasswordHash()))
            .<ResponseEntity<?>>map(u -> ResponseEntity.ok(Map.of("id", u.getId(), "name", u.getName(), "email", u.getEmail())))
            .orElse(ResponseEntity.status(401).body(Map.of("message", "Wrong email or password.")));
    }
}
