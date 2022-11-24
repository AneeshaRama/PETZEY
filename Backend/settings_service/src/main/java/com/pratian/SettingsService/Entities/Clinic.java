package com.pratian.SettingsService.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Clinic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long clinicId;

    private String clinicName;

    private String clinicAddress;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "clinic_doctor",joinColumns = @JoinColumn(name = "clinic_id"), inverseJoinColumns = @JoinColumn(name = "doctor_id"))
    @JsonIgnore
    private List<Doctor> doctors;

}
