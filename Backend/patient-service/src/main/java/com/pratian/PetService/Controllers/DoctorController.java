package com.pratian.PetService.Controllers;

import com.pratian.PetService.Services.DoctorServices;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    @Autowired
    private DoctorServices doctorServices;

    @GetMapping("/doctor/{doctorId}/profile")
    @Operation(summary = "To get the doctor profile by doctor Id")
    public ResponseEntity<?> getDoctorProfile(@PathVariable(value = "doctorId")long doctorId){
        return new ResponseEntity<>(doctorServices.getDoctorProfile(doctorId),HttpStatus.OK);
    }

    @GetMapping("/doctor/{doctorId}/appointment-history")
    @Operation(summary = "To get all appointment histories of doctor")
    public ResponseEntity<?> getAppointmentHistoryByDoctorID(@PathVariable(value = "doctorId")long doctorId){
        return new ResponseEntity<>(doctorServices.getAppointmentHistoryFromDoctorId(doctorId), HttpStatus.OK);
    }

    @GetMapping("/doctor/{name}/profiles")
    @Operation(summary = "To search doctor profiles")
    public ResponseEntity<?> searchDoctorProfile(@PathVariable(value = "name")String name){
        return new ResponseEntity<>(doctorServices.searchDoctorProfile(name), HttpStatus.OK);
    }

    @GetMapping("/doctor/recommendation/{appointmentId}")
    @Operation(summary = "To get the doctor recommendation")
    public ResponseEntity<?> getDoctorRecommendation(@PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(doctorServices.getDoctorRecommendation(appointmentId), HttpStatus.OK);
    }

}
