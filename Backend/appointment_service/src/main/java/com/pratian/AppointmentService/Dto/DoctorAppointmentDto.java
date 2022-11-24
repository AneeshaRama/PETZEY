package com.pratian.AppointmentService.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DoctorAppointmentDto {
    private long appointmentId;

    private long doctorId;

}
