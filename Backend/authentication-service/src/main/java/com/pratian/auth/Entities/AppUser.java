package com.pratian.auth.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pratian.auth.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    private String username;

    @JsonIgnore
    private String userPassword;

    @Enumerated(EnumType.STRING)
    private Role role;


}
