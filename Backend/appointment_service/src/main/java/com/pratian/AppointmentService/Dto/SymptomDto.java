package com.pratian.AppointmentService.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SymptomDto {

    private long symptomId;

    private String description;
}
