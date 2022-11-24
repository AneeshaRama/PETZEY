package com.pratian.AppointmentService.Entities;

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
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long prescriptionId;

    private String prescriptionDate;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "prescription_id")
    private List<Medicine> medicines;
}
