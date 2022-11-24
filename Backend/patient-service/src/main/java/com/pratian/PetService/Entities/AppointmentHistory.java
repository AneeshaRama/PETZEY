package com.pratian.PetService.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AppointmentHistory {
    private long appointmentHistoryId;

    private String petName;

    private String doctorName;

    private String ownerName;

    private Date appointmentDate;

    private Time appointmentTime;

    private long petId;

    private long doctorId;
}
