package com.pratian.AppointmentService.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PrescriptionDto {

    private long prescriptionId;

    private String prescriptionDate;

}
