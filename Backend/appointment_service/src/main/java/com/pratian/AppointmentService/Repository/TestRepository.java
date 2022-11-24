package com.pratian.AppointmentService.Repository;

import com.pratian.AppointmentService.Entities.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {
}
