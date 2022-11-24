package com.pratian.SettingsService.Service;

import com.pratian.SettingsService.Dto.PetDto;
import com.pratian.SettingsService.Entities.Pet;

import java.util.List;

public interface PetServices {

    PetDto addPet(Pet pet, long ownerId);

    PetDto getPetProfile(long petId);

    Pet getPetDetails(long petId);

    List<PetDto> getAllPets();

    List<PetDto> getAllPetsByOwnerId(long ownerId);

    List<PetDto> searchPetProfile(String name);

    PetDto editPetDetails(PetDto petDto, long ownerId, long petId );

    void deletePetDetails(long petId, long ownerId);

    boolean isPetExist(long petId);

    boolean isPetExistsByName(String name);
}
