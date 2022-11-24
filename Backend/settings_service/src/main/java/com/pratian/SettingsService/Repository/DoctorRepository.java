package com.pratian.SettingsService.Repository;

import com.pratian.SettingsService.Entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    @Query(value = "select d from Doctor d where d.doctorName = :name")
    List<Doctor> searchDoctorProfiles(@Param(value = "name")String name);

    @Query(value = "select d from Doctor d where d.speciality = :speciality")
    List<Doctor> getDoctorBySpeciality(@Param(value = "speciality")String speciality);

    Doctor findByUsername(String username);
}
