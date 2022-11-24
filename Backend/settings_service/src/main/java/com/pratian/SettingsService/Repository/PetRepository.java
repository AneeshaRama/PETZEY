package com.pratian.SettingsService.Repository;

import com.pratian.SettingsService.Dto.PetDto;
import com.pratian.SettingsService.Entities.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    @Query(value = "select p from Pet p where p.petName = :name")
    List<Pet> searchPetProfile(@Param(value = "name")String name);

    Pet findByPetName(String name);

}
