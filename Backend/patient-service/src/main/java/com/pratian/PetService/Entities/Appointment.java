package com.pratian.PetService.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Appointment {
    private long appointmentId;

    private long petId;

    private String appointmentDate;

    private String appointmentTime;

    private String reasonToVisit;

    private String petIssue;

    private String patientName;
}
