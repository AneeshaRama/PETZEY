package com.pratian.auth.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pratian.auth.Enums.Prefix;
import com.pratian.auth.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Receptionist {

    private String receptionistName;

    private String username;

    private String userPassword;

    private String phone;

    private String address;

    private String email;

    private Prefix prefix;

    private Role role;

    private String profilePicture = "default.jpg";

}
