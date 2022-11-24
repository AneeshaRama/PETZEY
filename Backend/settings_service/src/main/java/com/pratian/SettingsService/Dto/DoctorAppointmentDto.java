package com.pratian.SettingsService.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DoctorAppointmentDto {
    private long appointmentId;

    private long doctorId;
}
