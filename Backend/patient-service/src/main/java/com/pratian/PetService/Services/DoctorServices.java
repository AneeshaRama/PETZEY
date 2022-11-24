package com.pratian.PetService.Services;

import com.pratian.PetService.Dtos.DoctorRecommendationDto;
import com.pratian.PetService.Entities.AppointmentHistory;
import com.pratian.PetService.Entities.Doctor;

import java.util.List;

public interface DoctorServices {
    Doctor getDoctorProfile(long doctorId);

    List<AppointmentHistory> getAppointmentHistoryFromDoctorId(long doctorId);

    List<Doctor> searchDoctorProfile(String name);

    List<DoctorRecommendationDto> getDoctorRecommendation(long appointmentId);

    boolean isDoctorExist(long doctorId);

    boolean isAppointmentHistoryExistForDoctor(long doctorId);

    boolean isAppointmentExists(long appointmentId);
}
