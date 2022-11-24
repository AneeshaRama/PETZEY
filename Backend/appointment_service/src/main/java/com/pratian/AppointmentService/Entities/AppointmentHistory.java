package com.pratian.AppointmentService.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AppointmentHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long appointmentHistoryId;

    private String petName;

    private String doctorName;

    private String ownerName;

    private String appointmentDate;

    private String appointmentTime;

    private long petId;

    private long doctorId;

    private long appointmentId;
}
