package com.pratian.AppointmentService.Controllers;

import com.pratian.AppointmentService.Dto.SymptomDto;
import com.pratian.AppointmentService.Service.SymptomServices;
import com.pratian.AppointmentService.Utils.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/symptoms")
public class SymptomController {

    @Autowired
    private SymptomServices symptomServices;

    @PostMapping("/create/symptom/pet/{petId}/new")
    @Operation(summary = "To add new symptom")
    public ResponseEntity<?> post(@RequestBody SymptomDto symptomDto, @PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(symptomServices.addSymptom(symptomDto, petId), HttpStatus.CREATED);
    }

    @GetMapping("/symptom/{symptomId}")
    @Operation(summary = "To get the details of symptom")
    public ResponseEntity<?> getById(@PathVariable(value = "symptomId")long symptomId){
        return new ResponseEntity<>(symptomServices.getSymptomById(symptomId),HttpStatus.OK);
    }

    @GetMapping("/pet/{petId}/all-symptoms")
    @Operation(summary = "To get the list of symptoms by pet Id")
    public ResponseEntity<?> getByPetId(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(symptomServices.getSymptomsByPetId(petId),HttpStatus.OK);
    }

    @PutMapping("/symptom/{symptomId}/update")
    @Operation(summary = "To update the symptom details")
    public ResponseEntity<?> put(@RequestBody SymptomDto symptomDto, @PathVariable(value = "symptomId")long symptomId){
        return new ResponseEntity<>(symptomServices.editSymptom(symptomDto, symptomId), HttpStatus.OK);
    }

    @DeleteMapping("/symptom/{symptomId}/remove")
    @Operation(summary = "To remove symptom details")
    public ResponseEntity<ApiResponse> delete(@PathVariable(value = "symptomId")long symptomId){
        symptomServices.deleteSymptom(symptomId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Symptom details has been successfully removed", true), HttpStatus.OK);
    }

    @GetMapping("/check/symptoms/pet/{petId}")
    @Operation(summary = "To check if symptoms exists by pet id")
    public ResponseEntity<?> isSymptomsExists(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(symptomServices.isSymptomsExists(petId), HttpStatus.OK);
    }
}
