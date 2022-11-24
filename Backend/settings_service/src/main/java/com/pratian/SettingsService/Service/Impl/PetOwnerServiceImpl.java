package com.pratian.SettingsService.Service.Impl;

import com.pratian.SettingsService.Dto.PetOwnerDto;
import com.pratian.SettingsService.Entities.Pet;
import com.pratian.SettingsService.Entities.PetOwner;
import com.pratian.SettingsService.Exception.ResourceNotFoundException;
import com.pratian.SettingsService.Repository.PetOwnerRepository;
import com.pratian.SettingsService.Repository.PetRepository;
import com.pratian.SettingsService.Service.PetOwnerServices;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PetOwnerServiceImpl implements PetOwnerServices {

    @Autowired
    private PetOwnerRepository petOwnerRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private ModelMapper modelMapper;

    private static final Logger log = LoggerFactory.getLogger(PetOwnerServiceImpl.class);

    @Override
    public PetOwnerDto addPetOwner(PetOwnerDto owner) {
        log.info("Checking if pet owner already exists with id: "+ owner.getOwnerId());
        if(petOwnerRepository.existsById(owner.getOwnerId())){
            throw new ResourceNotFoundException("Owner already exist with owner Id: "+ owner.getOwnerId());
        }
        log.info("Saving the owner details in the database");
        PetOwner newOwner = petOwnerRepository.save(modelMapper.map(owner, PetOwner.class));
       return owner;
    }

    @Override
    public PetOwner getPetOwnerDetails(long ownerId) {
        log.info("Checking if owner exist in the database with owner id "+ownerId);
        PetOwner owner = petOwnerRepository.findById(ownerId).orElseThrow(()-> new ResourceNotFoundException("Owner not found with owner Id: " + ownerId));
        return owner;
    }

    @Override
    public PetOwnerDto getPetOwnerProfile(long ownerId) {
        log.info("Checking if owner exist in the database with owner id "+ownerId);
        PetOwner owner = petOwnerRepository.findById(ownerId).orElseThrow(()-> new ResourceNotFoundException("Owner not found with owner Id: " + ownerId));
        PetOwnerDto ownerDto = modelMapper.map(owner, PetOwnerDto.class);
        return ownerDto;
    }

    @Override
    public PetOwnerDto getPetOwnerProfileByUsername(String username) {
        log.info("Checking if pet owner exists with username "+ username);
        PetOwner owner = petOwnerRepository.findByUsername(username);
        if(owner == null){
            log.error("Pet owner not found with username "+ username);
            throw new ResourceNotFoundException("Pet owner not found with username "+ username);
        }
        return modelMapper.map(owner, PetOwnerDto.class);
    }

    @Override
    public PetOwnerDto getPetOwnerProfileByPetId(long petId) {
        log.info("To get the pet owner profile by pet id");
         petRepository.findById(petId).orElseThrow(()-> new ResourceNotFoundException("Pet not found with pet Id: "+petId));
        PetOwner owner = null;
        List<PetOwner> owners = petOwnerRepository.findAll();
        if(owners.isEmpty()){
            log.error("No pet owners found");
            throw new ResourceNotFoundException("Pet owners not found");
        }
        for(PetOwner petOwner: owners){
            List<Pet> pets = petOwner.getPets();
            for(Pet pet : pets){
                if(pet.getPetId() == petId){
                    owner = petOwner;
                    break;
                }
            }
        }
        PetOwnerDto ownerDto = modelMapper.map(owner, PetOwnerDto.class);
        return ownerDto;
    }

    @Override
    public PetOwnerDto editPetOwner(PetOwnerDto ownerDto, long ownerId) {
        log.info("Checking if owner exist in the database with owner id "+ownerId);
        PetOwner existingOwner = petOwnerRepository.findById(ownerId).orElseThrow(()-> new ResourceNotFoundException("Owner not found with owner Id: "+ ownerId));
        existingOwner.setOwnerName(ownerDto.getOwnerName());
        existingOwner.setUsername(ownerDto.getUsername());
        existingOwner.setEmail(ownerDto.getEmail());
        existingOwner.setPhone(ownerDto.getPhone());
        existingOwner.setAddress(ownerDto.getAddress());
        existingOwner.setProfilePicture(ownerDto.getProfilePicture());
        petOwnerRepository.save(existingOwner);
        PetOwnerDto updatedOwnerDto = modelMapper.map(existingOwner, PetOwnerDto.class);
        return updatedOwnerDto;
    }

    @Override
    public void deletePetOwnerProfile(long ownerId) {
        log.info("Checking if owner exist in the database with owner id "+ownerId);
        PetOwner owner = petOwnerRepository.findById(ownerId).orElseThrow(()-> new ResourceNotFoundException("Owner not found with owner Id: "+ ownerId));
        log.info("Deleting the owner profile");
        petOwnerRepository.deleteById(owner.getOwnerId());
    }
}
