package com.pratian.AppointmentService.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AppointmentDto {

    private long appointmentId;

    private String appointmentDate;

    private String appointmentTime;

    private String reasonToVisit;

    private String petIssue;

    private String patientName;



}
