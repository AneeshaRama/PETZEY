package com.pratian.AppointmentService.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DoctorRecommendationDto {
    private long doctorId;

    private String doctorName;

}
