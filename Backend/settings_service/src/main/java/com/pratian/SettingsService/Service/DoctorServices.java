package com.pratian.SettingsService.Service;

import com.pratian.SettingsService.Dto.DoctorDto;
import com.pratian.SettingsService.Dto.DoctorRecommendationDto;
import com.pratian.SettingsService.Entities.Doctor;

import java.util.List;

public interface DoctorServices {
    DoctorDto addDoctorProfile(Doctor doctor);

    DoctorDto getDoctorProfile(long doctorId);

    DoctorDto getDoctorByUsername(String username);

    DoctorDto getDoctorProfileByAppointmentId(long appointmentId);

    List<DoctorDto> getAllDoctorProfiles();

    List<DoctorDto> searchDoctorProfiles(String name);

    List<DoctorRecommendationDto> getDoctorsBySpeciality(String speciality);

    DoctorDto editDoctorProfile(DoctorDto doctorDto, long doctorId);

    void deleteDoctorProfile(long doctorId);

    boolean isDoctorExists(long doctorId);

    boolean isAppointmentExist(long appointmentId);
}
