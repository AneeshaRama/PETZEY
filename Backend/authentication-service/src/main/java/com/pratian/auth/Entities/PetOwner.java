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
public class PetOwner {

    private String ownerName;

    private String username;

    private String phone;

    private String userPassword;

    private String email;

    private String address;

    private Prefix prefix;

    private Role role;

    private String profilePicture = "default.jpg";

}
