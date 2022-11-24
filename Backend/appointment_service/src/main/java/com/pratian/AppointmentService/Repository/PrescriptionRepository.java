package com.pratian.AppointmentService.Repository;

import com.pratian.AppointmentService.Entities.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

    @Query(value = "select p from Prescription p where p.prescriptionDate = :date")
    Prescription getPrescriptionByDate(@Param(value = "date") String date);
}
