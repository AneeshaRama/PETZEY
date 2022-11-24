package com.pratian.AppointmentService.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Clinic {
    private long clinicId;

    private String clinicName;

    private String clinicAddress;
}
