package com.pratian.PetService.Entities;

import com.pratian.PetService.Enums.Prefix;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Doctor {

    private long doctorId;

    private String doctorName;

    private String npiNumber;

    private String speciality;

    private String email;

    private String phoneNumber;

    private String address;

    private Prefix prefix;
}
