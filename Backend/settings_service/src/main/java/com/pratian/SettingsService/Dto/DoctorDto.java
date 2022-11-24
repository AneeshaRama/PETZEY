package com.pratian.SettingsService.Dto;

import com.pratian.SettingsService.Enums.Prefix;
import com.pratian.SettingsService.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DoctorDto {
    private long doctorId;

    private String doctorName;

    private String username;

    private String npiNumber;

    private String speciality;

    private String email;

    private String phoneNumber;

    private String address;

    private Prefix prefix;

    private Role role;

    private String profilePicture = "default.jpg";

}
