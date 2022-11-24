package com.pratian.auth.Dtos;

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
public class PetOwnerDto {

    private String ownerName;

    private String username;

    private String phone;

    private String email;

    private String address;

    private Prefix prefix;

    private Role role;

    private String profilePicture = "default.jpg";


}
