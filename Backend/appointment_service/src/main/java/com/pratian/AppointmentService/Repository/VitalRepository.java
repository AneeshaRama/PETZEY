package com.pratian.AppointmentService.Repository;

import com.pratian.AppointmentService.Entities.Vital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VitalRepository extends JpaRepository<Vital, Long> {
}
