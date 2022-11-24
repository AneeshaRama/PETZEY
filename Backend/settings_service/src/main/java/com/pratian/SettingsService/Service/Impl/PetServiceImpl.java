package com.pratian.SettingsService.Service.Impl;

import com.pratian.SettingsService.Dto.PetDto;
import com.pratian.SettingsService.Entities.Appointment;
import com.pratian.SettingsService.Entities.Pet;
import com.pratian.SettingsService.Entities.PetOwner;
import com.pratian.SettingsService.Exception.ResourceAlreadyExistsException;
import com.pratian.SettingsService.Exception.ResourceNotFoundException;
import com.pratian.SettingsService.Repository.PetOwnerRepository;
import com.pratian.SettingsService.Repository.PetRepository;
import com.pratian.SettingsService.Service.PetServices;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetServiceImpl implements PetServices {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private PetOwnerRepository petOwnerRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private RestTemplate restTemplate;

    @Value(value = "${rest.appointmentService}")
    String appointmentServiceUrl;

    private static final Logger log = LoggerFactory.getLogger(PetServiceImpl.class);

    @Override
    public PetDto addPet(Pet pet, long ownerId) {
        log.info("To add new pet");
        PetOwner owner = petOwnerRepository.findById(ownerId).orElseThrow(()-> new ResourceNotFoundException("Owner not found with owner Id: " + ownerId));
        if(petRepository.existsById(pet.getPetId())){
            log.error("Pet profile already exist with pet id "+ pet.getPetId());
            throw new ResourceAlreadyExistsException("Pet already exist with pet Id: " + pet.getPetId());
        }
        log.info("Saving the pet profile in database");
        Pet newPet = petRepository.save(pet);
        log.info("Adding the pet to owner's pet list");
        owner.getPets().add(newPet);
        log.info("Saving the owner profile");
        petOwnerRepository.save(owner);
        PetDto petDto = modelMapper.map(newPet, PetDto.class);
        return petDto;
    }

    @Override
    public PetDto getPetProfile(long petId) {
        log.info("Getting the pet dto by pet id");
        Pet pet = petRepository.findById(petId).orElseThrow(()-> new ResourceNotFoundException("Pet not found with pet Id: " + petId));
        PetDto petDto = modelMapper.map(pet, PetDto.class);
        return petDto;
    }

    @Override
    public Pet getPetDetails(long petId) {
        log.info("Getting the pet profile by pet id");
        Pet pet = petRepository.findById(petId).orElseThrow(()->  new ResourceNotFoundException("Pet not found with pet Id: " + petId));
        return pet;
    }

    @Override
    public List<PetDto> getAllPets() {
        log.info("Getting all pet profiles");
        List<Pet> pets = petRepository.findAll();
        List<PetDto> petDtos = pets.stream().map(p -> modelMapper.map(p, PetDto.class)).collect(Collectors.toList());
        return petDtos;
    }

    @Override
    public List<PetDto> getAllPetsByOwnerId(long ownerId) {
        log.info("Getting all pet profiles of owner by owner id");
        if(petOwnerRepository.existsById(ownerId)){
            PetOwner owner = petOwnerRepository.findById(ownerId).get();
            List<Pet> pets = owner.getPets();
            if(pets.isEmpty()){
                log.error("No pets found for owner of owner id: "+ ownerId);
                throw new ResourceNotFoundException("Pets not found");
            }
            List<PetDto> petDtos = pets.stream().map(p -> modelMapper.map(p, PetDto.class)).collect(Collectors.toList());

            return petDtos;
        }else{
            log.error("Owner not found with owner id "+ ownerId);
            throw new ResourceNotFoundException("Owner not found with owner Id: " + ownerId);
        }

    }

    @Override
    public List<PetDto> searchPetProfile(String name) {
        log.info("Searching pet profiles by pet name");
        List<Pet> pets = petRepository.searchPetProfile(name);
        if(pets.isEmpty()){
            log.error("Pets not found with pet name "+ name);
            throw new ResourceNotFoundException("Pets not found");
        }
        List<PetDto> petDtos = pets.stream().map(p->modelMapper.map(p, PetDto.class)).collect(Collectors.toList());
        return petDtos;
    }

    @Override
    public PetDto editPetDetails(PetDto petDto,long ownerId, long petId) {
        log.info("Updating the pet profile");
        if(petOwnerRepository.existsById(ownerId)){
            if(petRepository.existsById(petId)){
                Pet existingPet = petRepository.findById(petId).get();
                existingPet.setPetName(petDto.getPetName());
                existingPet.setAge(petDto.getAge());
                existingPet.setGender(petDto.getGender());
                existingPet.setBloodGroup(petDto.getBloodGroup());
                existingPet.setSpecies(petDto.getSpecies());
                existingPet.setDateOfBirth(petDto.getDateOfBirth());
                existingPet.setProfilePic(petDto.getProfilePic());
                petRepository.save(existingPet);
                PetDto updatedDto = modelMapper.map(existingPet, PetDto.class);
                return updatedDto;
            }else{
                log.error("Pet not found with pet id "+ petId);
                throw new ResourceNotFoundException("Pet not found with pet Id: "+petId);
            }
        }else{
            log.error("Owner not found with owner id "+ ownerId);
                throw new ResourceNotFoundException("Owner not found with owner Id: " + ownerId);
        }

    }


    @Override
    public void deletePetDetails(long ownerId, long petId) {
        log.info("Deleting pet profile");
        if(petOwnerRepository.existsById(ownerId)){
            if(petRepository.existsById(petId)){
                log.info("Deleting the pet profile of pet id: "+ petId );
                petRepository.deleteById(petId);
            }else{
                log.error("Pet not found with pet id "+ petId);
                throw new ResourceNotFoundException("Pet not found with pet Id: " + petId);
            }
        }else{
            log.error("Owner not found with owner id "+ petId);
            throw new ResourceNotFoundException("Owner not found with owner Id: " + ownerId);
        }

    }

    @Override
    public boolean isPetExist(long petId) {
        log.info("Checking if pet exists with pet id "+ petId);
        if(petRepository.existsById(petId)){
            return true;
        }
        return false;
    }

    @Override
    public boolean isPetExistsByName(String name) {
        log.info("Checking if pet exists by pet name "+ name);
        Pet pet = petRepository.findByPetName(name);
        return pet != null;
    }
}
