package com.pratian.AppointmentService.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AppointmentHistoryDto {

    private long appointmentHistoryId;

    private String petName;

    private long appointmentId;

    private String doctorName;

    private String ownerName;

    private String appointmentDate;

    private String appointmentTime;

    private long petId;

    private long doctorId;
}
