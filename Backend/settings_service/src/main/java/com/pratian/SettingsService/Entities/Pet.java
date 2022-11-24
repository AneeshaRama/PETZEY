package com.pratian.SettingsService.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
