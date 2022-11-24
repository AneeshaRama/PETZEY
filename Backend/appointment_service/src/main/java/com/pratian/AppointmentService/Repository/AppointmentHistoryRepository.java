package com.pratian.AppointmentService.Repository;

import com.pratian.AppointmentService.Entities.AppointmentHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentHistoryRepository extends JpaRepository<AppointmentHistory, Long> {

    @Query(value = "select a from AppointmentHistory a where a.petId = :petId")
    List<AppointmentHistory> getAppointmentHistoryByPetId(@Param(value = "petId")long petId);

    @Query(value = "select a from AppointmentHistory a where a.doctorId = :doctorId")
    List<AppointmentHistory> getAppointmentHistoryByDoctorId(@Param(value = "doctorId")long doctorId);
}
