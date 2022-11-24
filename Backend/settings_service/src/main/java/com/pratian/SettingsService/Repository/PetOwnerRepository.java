package com.pratian.SettingsService.Repository;

import com.pratian.SettingsService.Entities.PetOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetOwnerRepository extends JpaRepository<PetOwner, Long> {
    PetOwner findByUsername(String username);

    @Query(value = "select p from PetOwner p where p.address = :address")
    List<PetOwner> getPetOwnersByAddress(@Param(value = "address")String address);
}
