package com.pratian.AppointmentService.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetByDateAppointmentDto {

    private long appointmentId;

    private long petId;

    private long doctorId;

    private String appointmentDate;

    private String appointmentTime;

    private String reasonToVisit;

    private String petIssue;

}
