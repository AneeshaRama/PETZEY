package com.pratian.SettingsService.Dto;

import com.pratian.SettingsService.Enums.Prefix;
import com.pratian.SettingsService.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReceptionistDto {

    private long receptionistId;

    private String receptionistName;

    private String username;

    private String email;

    private String phone;

    private String address;

    private Prefix prefix;

    private Role role;

    private String profilePicture = "default.jpg";

}
