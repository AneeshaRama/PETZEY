package com.pratian.PetService.Services.Impl;

import com.pratian.PetService.Entities.*;
import com.pratian.PetService.Exceptions.ResourceNotFoundException;
import com.pratian.PetService.Services.PetServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.ArrayList;
import java.util.List;

@Service
public class PetServiceImpl implements PetServices {

    @Autowired
    private RestTemplate restTemplate;

    @Value(value = "${rest.settingService}")
    String settingServiceUrl;

    @Value(value = "${rest.appointmentService}")
    String appointmentServiceUrl;

    private static final Logger log = LoggerFactory.getLogger(PetServiceImpl.class);

    @Override
    public List<Pet> getAllPetProfile() {
        log.info("Getting all the pet profiles");
        List<Pet> pets = restTemplate.getForObject(settingServiceUrl+"/pets/all-profiles", List.class);
        if(pets.isEmpty()){
            throw new ResourceNotFoundException("Pets not found");
        }
        return pets;
    }

    @Override
    public Pet getPetProfile(long petId) {
        log.info("Getting pet profile of pet id "+petId);
        if(isPetExist(petId)){
            Pet pet = restTemplate.getForObject(settingServiceUrl+"/pets/pet/"+petId+"/profile", Pet.class);
            return pet;
        }else{
            throw new ResourceNotFoundException("Pet not found with pet Id: "+petId);
        }

    }

    @Override
    public List<Pet> searchPetProfile(String name) {
        log.info("Searching for all pet profiles with pet name "+name);
        if(isPetExistsByName(name)){
            List<Pet> pets = restTemplate.getForObject(settingServiceUrl+"/pets/pet/"+name+"/profiles", List.class);
            return pets;
        }
        throw  new ResourceNotFoundException("Pet not found");

    }

    @Override
    public boolean isPetExist(long petId) {
        log.info("Checking if pet profile exists with pet id "+petId);
        String url = settingServiceUrl + "/pets/exists/pet/" + petId;
        ResponseEntity<Boolean> response = restTemplate.getForEntity(url, Boolean.class);
        return Boolean.TRUE.equals(response.getBody());
    }

    @Override
    public List<AppointmentHistory> getAppointmentHistoriesByPetId(long petId) {
        log.info("Getting appointment histories for pet id "+ petId);
        if(isPetExist(petId)){
            if(isAppointmentHistoryExistForPet(petId)){
                List<AppointmentHistory> appointmentHistories = restTemplate.getForObject(appointmentServiceUrl+"/appointment-history/pet/"+petId+"/appointment-history", List.class);
                if(appointmentHistories.isEmpty()){
                    log.error("Appointment histories not found");
                    throw new ResourceNotFoundException("Appointment histories not found");
                }
                return appointmentHistories;
            }else{
                log.error("Appointment histories not found for pet id "+petId);
                throw new ResourceNotFoundException("Appointment history not found for this pet");
            }

        }else{
            log.error("Pet not found with pet id "+petId);
            throw new ResourceNotFoundException("Pet not found with pet Id: "+petId);
        }

    }

    @Override
    public boolean isAppointmentHistoryExistForPet(long petId) {
        log.info("Checking if appointment histories exists for pet id "+petId);
        ResponseEntity<Boolean> response = restTemplate.getForEntity(appointmentServiceUrl+"/appointment-history/exist/pet/"+petId, Boolean.class);
        return Boolean.TRUE.equals(response.getBody());
    }

    @Override
    public List<Pet> viewRecentlyConsultedPets(String date) {
        log.info("Getting recently consulted pet profiles");
        if (isAppointmentExistByDate(date)) {
            List<Appointment> allAppointments = new ArrayList<>();
            List<Pet> pets = new ArrayList<>();
            Appointment[] appointments = restTemplate.getForObject(appointmentServiceUrl + "/appointments/" + date + "/all-appointments/dto",
                                                                   Appointment[].class);


            for (Appointment a : appointments) {
                allAppointments.add(a);
            }

            for (Appointment appointment : allAppointments) {
                Pet pet = restTemplate.getForObject(settingServiceUrl + "/pets/pet/" + appointment.getPetId() + "/profile", Pet.class);
                pets.add(pet);
            }
                return pets;

        } else {
            throw new ResourceNotFoundException("Appointments not found");
        }

    }

    @Override
    public List<Symptoms> getSymptomsHistory(long petId) {
        log.info("Getting symptom histories for pet id "+ petId);
        if(isPetExist(petId)){
            if(isSymptomExists(petId)){
                List<Symptoms> symptoms = restTemplate.getForObject(appointmentServiceUrl+"/symptoms/pet/"+petId+"/all-symptoms", List.class);
                return symptoms;
            }else{
                log.error("Symptom histories not found for pet id "+petId);
                throw new ResourceNotFoundException("Symptom histories not found");
            }
        }else{
            log.error("Pet not found with pet id "+petId);
            throw new ResourceNotFoundException("Pet not found with pet id "+petId);
        }

    }

    @Override
    public List<Prescription> getPrescriptionHistories(long petId) {
        log.info("Getting prescription histories");
        if(isAppointmentsExistsByPetId(petId)){
            if(isPrescriptionHistoriesExist(petId)){
                List<Prescription> prescriptions = restTemplate.getForObject(appointmentServiceUrl+"/prescriptions/pet/"+petId+"/prescription-histories", List.class);
                return prescriptions;
            }else{
                log.error(("Prescription histories not found for pet id "+petId));
                throw new ResourceNotFoundException("Prescription histories not found");
            }
        }else{
            log.error("Prescription histories not found for pet id "+petId);
            throw new ResourceNotFoundException("Prescription histories not found for pet id "+petId);
        }
    }

    @Override
    public Prescription getPrescriptionHistoryByDate(long petId,String date) {
        log.info("Getting prescription histories by date");
        if(isPrescriptionExistsByDate(petId,date)){
            return restTemplate.getForObject(appointmentServiceUrl+"/prescriptions/prescription/pet/+"+petId+"/date/"+date, Prescription.class);
        }else {
            log.error("Prescription histories not found");
            throw new ResourceNotFoundException("Prescription histories not found");
        }
    }

    @Override
    public boolean isAppointmentExistByDate(String date) {
        log.info("Checking if appointment exists on date "+ date);
        ResponseEntity<Boolean> response = restTemplate.getForEntity(appointmentServiceUrl+"/appointments/exists/"+date, Boolean.class);
        return Boolean.TRUE.equals(response.getBody());
    }

    @Override
    public boolean isPetExistsByName(String name) {
        log.info("Checking if pet exists with pet name "+ name);
        ResponseEntity<Boolean> response = restTemplate.getForEntity(settingServiceUrl+"/pets/check/pet/"+name+"/profile", Boolean.class);
        return Boolean.TRUE.equals(response.getBody());
    }

    @Override
    public boolean isSymptomExists(long petId) {
        log.info("Checking if symptoms exist for pet id "+petId);
        ResponseEntity<Boolean> response = restTemplate.getForEntity(appointmentServiceUrl+"/symptoms/check/symptoms/pet/"+petId, Boolean.class);
        return Boolean.TRUE.equals(response.getBody());
    }

    @Override
    public boolean isPrescriptionHistoriesExist(long petId) {
        log.info("Checking if prescription histories found for pet id "+petId);
        ResponseEntity<Boolean> response = restTemplate.getForEntity(appointmentServiceUrl+"/prescriptions/check/pet/"+petId, Boolean.class);
        return Boolean.TRUE.equals(response.getBody());
    }

    @Override
    public boolean isAppointmentsExistsByPetId(long petId) {
        log.info("Checking if appointments exist for pet id "+petId);
        ResponseEntity<Boolean> response = restTemplate.getForEntity(appointmentServiceUrl+"/appointments/check/pet/"+petId, Boolean.class);
        return Boolean.TRUE.equals(response.getBody());
    }

    @Override
    public boolean isPrescriptionExistsByDate(long petId, String date) {
        ResponseEntity<Boolean> response = restTemplate.getForEntity(appointmentServiceUrl+"/prescriptions/check/pet/"+petId+"/date/"+date, Boolean.class);
        return Boolean.TRUE.equals(response.getBody());
    }


}
