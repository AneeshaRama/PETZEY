package com.pratian.SettingsService.Service;

import com.pratian.SettingsService.Dto.ClinicDto;
import com.pratian.SettingsService.Entities.Clinic;

import java.util.List;

public interface ClinicServices {
    Clinic addClinic(Clinic clinic);

    Clinic getClinic(long clinicId);

    Clinic editClinic(Clinic clinic, long clinicId);

    void deleteClinic(long clinicId);

    List<ClinicDto> getClinicRecommendation(String address);

    boolean isClinicRecommendationExists(String address);
}
