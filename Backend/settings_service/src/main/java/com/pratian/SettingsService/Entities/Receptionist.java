package com.pratian.SettingsService.Entities;

import com.pratian.SettingsService.Enums.Prefix;
import com.pratian.SettingsService.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Receptionist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long receptionistId;

    private String receptionistName;

    private String username;

    private String email;

    private String phone;

    private String address;

    private String profilePicture = "default.jpg";

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private Prefix prefix;
}
