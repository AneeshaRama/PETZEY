package com.pratian.SettingsService.Service;

import com.pratian.SettingsService.Dto.PetOwnerDto;
import com.pratian.SettingsService.Entities.PetOwner;

public interface PetOwnerServices {

    PetOwnerDto addPetOwner(PetOwnerDto owner);

    PetOwner getPetOwnerDetails(long ownerId);

    PetOwnerDto getPetOwnerProfile(long ownerId);

    PetOwnerDto getPetOwnerProfileByUsername(String username);

    PetOwnerDto getPetOwnerProfileByPetId(long petId);

    PetOwnerDto editPetOwner(PetOwnerDto ownerDto,long ownerId);

    void deletePetOwnerProfile(long ownerId);

}
