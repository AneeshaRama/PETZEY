package com.pratian.AppointmentService.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppointDetailsDto {
    private long appointmentId;

    private String appointmentDate;

    private String appointmentTime;

    private String reasonToVisit;

    private String petIssue;

    private String patientName;

    private long petId;

    private long doctorId;

    private long ownerId;
}
