package com.pratian.AppointmentService.Service;

import com.pratian.AppointmentService.Dto.AppointmentHistoryDto;
import com.pratian.AppointmentService.Entities.AppointmentHistory;

import java.util.List;

public interface AppointmentHistoryServices {

    AppointmentHistoryDto createAppointmentHistory(long appointmentId);

    List<AppointmentHistoryDto> getAppointmentHistoryDtoByPetId(long petId);

    List<AppointmentHistoryDto> getAppointmentHistoryDtoByDoctorId(long doctorId);

    boolean isAppointmentHistoryExistForPetId(long petId);

    boolean isAppointmentHistoryExistForDoctorId(long doctorId);
}
