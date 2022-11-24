package com.pratian.SettingsService.Repository;

import com.pratian.SettingsService.Entities.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClinicRepository extends JpaRepository<Clinic, Long> {

    @Query(value = "select c from Clinic c where c.clinicAddress = :address")
    List<Clinic> getClinicByAddress(@Param(value = "address")String address);

}
