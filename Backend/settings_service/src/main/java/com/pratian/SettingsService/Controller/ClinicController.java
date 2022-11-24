package com.pratian.SettingsService.Controller;

import com.pratian.SettingsService.Entities.Clinic;
import com.pratian.SettingsService.Service.ClinicServices;
import com.pratian.SettingsService.Utils.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clinics")
public class ClinicController {

    @Autowired
    private ClinicServices clinicServices;


    @PostMapping("/create/clinic/new")
    @Operation(summary = "To add new clinic")
    public ResponseEntity<?> post(@RequestBody Clinic clinic){
        return new ResponseEntity<>(clinicServices.addClinic(clinic), HttpStatus.CREATED);
    }

    @GetMapping("/clinic/{clinicId}")
    @Operation(summary = "To get the clinic details by clinic Id")
    public ResponseEntity<?> get(@PathVariable(value = "clinicId")long clinicId){
        return new ResponseEntity<>(clinicServices.getClinic(clinicId),HttpStatus.OK);
    }

    @PutMapping("/clinic/{clinicId}/update}")
    @Operation(summary = "To update the clinic details")
    public ResponseEntity<?> put(@RequestBody Clinic clinic, @PathVariable(value = "clinicId")long clinicId){
        return new ResponseEntity<>(clinicServices.editClinic(clinic, clinicId), HttpStatus.OK);
    }

    @DeleteMapping("/clinic/{clinicId}/remove")
    @Operation(summary = "To remove the details of clinic")
    public ResponseEntity<ApiResponse> delete(@PathVariable(value = "clinicId")long clinicId){
        clinicServices.deleteClinic(clinicId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Clinic details has been removed successfully", true), HttpStatus.OK);
    }

    @GetMapping("/get-clinic-recommendation/{address}")
    @Operation(summary = "To get clinic recommendation")
    public ResponseEntity<?> getClinicRecommendation(@PathVariable(value = "address")String address){
        return new ResponseEntity<>(clinicServices.getClinicRecommendation(address),HttpStatus.OK);
    }

    @GetMapping("/check/clinics/{address}")
    @Operation(summary = "To check if clinic recommendations exists")
    public ResponseEntity<?> isClinicRecommendationExists(@PathVariable(value = "address")String address){
        return new ResponseEntity<>(clinicServices.isClinicRecommendationExists(address),HttpStatus.OK);
    }
}
