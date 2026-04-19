package com.board_game_statistics.api.users;

import com.board_game_statistics.api.group_memberships.GroupMembership;
import com.board_game_statistics.api.users.dto.UserResponse;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.EnumSet;
import java.util.Set;

@Table(name = "users")
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String firstName;
    private String lastName;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @Column(name = "authority", nullable = false)
    private Set<Authority> authorities = EnumSet.noneOf(Authority.class);

    @OneToMany(mappedBy = "user")
    private Set<GroupMembership> groupMemberships;

    public long getId() {
        return id;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getEmail() {
        return email;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public User setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public User setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    @Override
    public Set<Authority> getAuthorities() {
        return authorities != null ? authorities : Collections.emptySet();
    }

    public User setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
        return this;
    }

    public UserResponse asResponse() {
        return new UserResponse(id, email, firstName, lastName, authorities);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        User user = (User) o;
        return id == user.id
                && email.equals(user.email)
                && password.equals(user.password)
                && firstName.equals(user.firstName)
                && lastName.equals(user.lastName)
                && authorities.equals(user.authorities);
    }
}
