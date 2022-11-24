package com.pratian.AppointmentService.Repository;


import com.pratian.AppointmentService.Entities.Symptom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SymptomRepository extends JpaRepository<Symptom, Long> {

    @Query(value = "select s from Symptom s where s.petId = :petId")
    List<Symptom> getSymptomsByPets(@Param(value = "petId")long petId);
}
