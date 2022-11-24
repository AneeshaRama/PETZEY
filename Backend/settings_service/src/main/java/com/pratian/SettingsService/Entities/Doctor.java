package com.pratian.SettingsService.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pratian.SettingsService.Enums.Prefix;
import com.pratian.SettingsService.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long doctorId;

    private String doctorName;

    private String username;

    private String npiNumber;

    private String speciality;

    private String email;

    private String phoneNumber;

    private String address;

    private String profilePicture = "default.jpg";


    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private Prefix prefix = Prefix.Dr;

    @ManyToMany(mappedBy = "doctors")
    @JsonIgnore
    private List<Clinic> clinics;
}
