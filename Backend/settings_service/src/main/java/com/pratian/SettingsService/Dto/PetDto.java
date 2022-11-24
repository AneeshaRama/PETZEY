package com.pratian.SettingsService.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PetDto {

    private long petId;

    private String petName;

    private float age;

    private String gender;

    private String bloodGroup;

    private String species;

    private String dateOfBirth;

    private String allergy;

    private String profilePic;

}
