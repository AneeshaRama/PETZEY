package com.pratian.AppointmentService.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pratian.AppointmentService.Enums.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;
import java.util.List;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long appointmentId;

    private long petId;

    private long doctorId;

    private long ownerId;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status = AppointmentStatus.REQUESTED;

    private String appointmentDate;

    private String appointmentTime;

    private String reasonToVisit;

    private String petIssue;

    private String patientName;

    @OneToOne
    @JoinColumn(name = "prescription_id")
    private Prescription prescription;

    @OneToOne
    @JoinColumn(name = "vital_id")
    private Vital vital;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "appointment_id")
    private List<Test> tests;

    @OneToOne
    @JoinColumn(name = "feedback_id")
    private Feedback feedback;

    @OneToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @OneToOne
    @JoinColumn(name = "appointment_history_id")
    @JsonIgnore
    private AppointmentHistory appointmentHistory;

}
