package com.pratian.AppointmentService.Repository;



import com.pratian.AppointmentService.Enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pratian.AppointmentService.Entities.Appointment;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
    @Query(value = "select count(a.status) from Appointment a where a.status = 'REQUESTED'")
    int getNumberOfAppointmentRequests();

    @Query(value = "select count(a.status) from Appointment a where a.status = 'CONFIRMED'")
    int getNumberOfConfirmedAppointments();

    @Query(value = "select count(a.status) from Appointment a where a.status = 'CANCELLED'")
    int getNumberOfCancelledAppointments();

    @Query(value = "select count(a.status) from Appointment a where a.status = 'CLOSED'")
    int getNumberOfClosedAppointments();

    @Query(value = "select a from Appointment a where a.status = :status")
    List<Appointment> getAppointmentsByStatus(@Param(value = "status") AppointmentStatus status);

    @Query(value = "select a from Appointment a where a.doctorId = :doctorId")
    List<Appointment> getAppointmentsByDoctor(@Param(value = "doctorId")long doctorId);

    @Query(value = "select a from Appointment a where a.appointmentDate = :date")
    List<Appointment> getAppointmentByDate(@Param(value = "date")String date);

    @Query(value = "select a from Appointment a where a.petId = :petId")
    List<Appointment> getAppointmentsByPetId(@Param(value = "petId")long petId);

    @Query(value = "select a from Appointment a where a.ownerId = :ownerId")
    List<Appointment> getAppointmentsByOwnerId(@Param(value = "ownerId") long ownerId);
}

