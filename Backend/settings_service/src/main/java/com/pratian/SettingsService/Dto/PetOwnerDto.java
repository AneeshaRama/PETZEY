package com.pratian.SettingsService.Dto;

import com.pratian.SettingsService.Enums.Prefix;
import com.pratian.SettingsService.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PetOwnerDto {
    private long ownerId;

    private String ownerName;

    private String username;

    private String phone;

    private String email;

    private String address;

    private Prefix prefix;

    private Role role;

    private String profilePicture = "default.jpg";

}
