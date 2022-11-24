package com.pratian.PetService.Controllers;

import com.pratian.PetService.Services.PetServices;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/pets")
public class PetController {

    @Autowired
    private PetServices petServices;

    @GetMapping("/all-profiles")
    @Operation(summary = "To get all pet profiles")
    public ResponseEntity<?> getAllProfiles(){
        return new ResponseEntity<>(petServices.getAllPetProfile(), HttpStatus.OK);
    }

    @GetMapping("/pet/{petId}/profile")
    @Operation(summary = "To get the pet profile")
    public ResponseEntity<?> getPetProfile(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(petServices.getPetProfile(petId), HttpStatus.OK);
    }

    @GetMapping("/pet/{name}/profiles")
    @Operation(summary = "To search pet profiles")
    public ResponseEntity<?> searchProfile(@PathVariable(value = "name")String name){
        return new ResponseEntity<>(petServices.searchPetProfile(name),HttpStatus.OK);
    }

    @GetMapping("/pet/{petId}/appointment-history")
    @Operation(summary = "To get all appointment histories of pet")
    public ResponseEntity<?> getAppointmentHistoryByPetID(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(petServices.getAppointmentHistoriesByPetId(petId), HttpStatus.OK);
    }

    @GetMapping("/recently-consulted-pets/{date}")
    @Operation(summary = "To get the profile of recently consulted pets")
    public ResponseEntity<?> recentlyConsultedPet(@PathVariable(value = "date")String date){
        return new ResponseEntity<>(petServices.viewRecentlyConsultedPets(date),HttpStatus.OK);
    }

    @GetMapping("/pet/{petId}/symptom-histories")
    @Operation(summary = "To get the symptom histories by pet id")
    public ResponseEntity<?> getSymptomHistories(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(petServices.getSymptomsHistory(petId),HttpStatus.OK);
    }

    @GetMapping("/pet/{petId}/prescription-histories")
    @Operation(summary = "To get prescription histories")
    public ResponseEntity<?> getPrescriptionHistories(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(petServices.getPrescriptionHistories(petId),HttpStatus.OK);
    }

    @GetMapping("pet/{petId}/date/{date}/prescription-history")
    @Operation(summary = "To get the prescription history by date")
    public ResponseEntity<?> getPrescriptionHistoryByDate(@PathVariable(value = "petId")long petId,@PathVariable(value = "date") String date){
        return new ResponseEntity<>(petServices.getPrescriptionHistoryByDate(petId,date),HttpStatus.OK);
    }

}
