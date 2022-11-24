package com.pratian.SettingsService.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ClinicDto {
    private long clinicId;

    private String clinicName;

    private String clinicAddress;
}
