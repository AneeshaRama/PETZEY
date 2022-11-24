package com.pratian.SettingsService.Repository;

import com.pratian.SettingsService.Entities.Receptionist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceptionistRepository extends JpaRepository<Receptionist, Long> {
    Receptionist findByUsername(String username);
}
