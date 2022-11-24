package com.pratian.AppointmentService.Service;

import com.pratian.AppointmentService.Dto.*;
import com.pratian.AppointmentService.Entities.Appointment;
import com.pratian.AppointmentService.Entities.Clinic;
import com.pratian.AppointmentService.Entities.Doctor;
import com.pratian.AppointmentService.Enums.AppointmentStatus;

import java.util.List;

public interface AppointmentServices {
	
	AppointmentDto addNewAppointment(AppointmentDto appointmentDto, long doctorId,long ownerId, long petId);

    List<AppointDetailsDto> getAllAppointments();

    List<AppointDetailsDto> getAppointmentsByOwnerId(long ownerId);

    Appointment getAppointmentDetails(long appointmentId);

    AppointmentDto editAppointmentDetails(AppointmentDto appointmentDto, long appointmentId);

    void deleteAppointmentDetails(long appointmentId);

    boolean isPetExist(long petId);

    boolean isDoctorExist(long doctorId);

    void closeAppointment(long appointmentId);

    void cancelAppointment(long appointmentId);

    void confirmAppointment(long appointmentId);

    int getNumberOfAppointmentRequests();

    int getNumberOfConfirmedAppointments();

    int getNumberOfCancelledAppointments();

    int getNumberOfClosedAppointments();

    int getTotalNumberOfAppointments();

    List<AppointDetailsDto> getAppointmentsByStatus(AppointmentStatus status);

    List<AppointDetailsDto> getAppointmentsByDoctor(long doctorId);

    Appointment createAppointmentReport(long appointmentId);

    Appointment editAppointmentReport(Appointment appointment, long appointmentId);

    List<AppointmentDto> getAppointmentByDate(String date);

    List<GetByDateAppointmentDto> getAppointmentDetailsByDate(String date);

    boolean isAppointmentByDateExist(String date);

    List<DoctorRecommendationDto> doctorRecommendation(long appointmentId);

    boolean isAppointmentExists(long appointmentId);

    DoctorAppointmentDto getAppointmentById(long appointmentId);

    List<Appointment> getAllAppointmentsByPetId(long petId);

    boolean isAppointmentExistsForPetId(long petId);

    List<Clinic> getClinicRecommendations(String address);

    boolean isClinicRecommendationExists(String address);
}

