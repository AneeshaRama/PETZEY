package com.pratian.AppointmentService.Controllers;

import com.pratian.AppointmentService.Service.AppointmentHistoryServices;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("appointment-histories")
public class AppointmentHistoryController {

    @Autowired
    private AppointmentHistoryServices appointmentHistoryServices;

    @PostMapping("/create/appointment/{appointmentId}/new")
    @Operation(summary = "To create appointment history")
    public ResponseEntity<?> post(@PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(appointmentHistoryServices.createAppointmentHistory(appointmentId), HttpStatus.CREATED);
    }


    @GetMapping("/pet/{petId}/appointment-history")
    @Operation(summary = "To get the list of appointment histories by pet Id")
    public ResponseEntity<?> getByPetId(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(appointmentHistoryServices.getAppointmentHistoryDtoByPetId(petId), HttpStatus.OK);
    }

    @GetMapping("/doctor/{doctorId}/appointment-history")
    @Operation(summary = "To get the list of appointment histories by doctor Id")
    public ResponseEntity<?> getByDoctor(@PathVariable(value = "doctorId")long doctorId){
        return new ResponseEntity<>(appointmentHistoryServices.getAppointmentHistoryDtoByDoctorId(doctorId), HttpStatus.OK);
    }

    @GetMapping("/exist/pet/{petId}")
    @Operation(summary = "To check if appointment history exist for pet")
    public ResponseEntity<?> isAppointmentHistoryExistForPetId(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(appointmentHistoryServices.isAppointmentHistoryExistForPetId(petId),HttpStatus.OK);
    }

    @GetMapping("/exist/doctor/{doctorId}")
    @Operation(summary = "To check if appointment history exist for doctor")
    public ResponseEntity<?> isAppointmentHistoryExistForDoctorId(@PathVariable(value = "doctorId")long doctorId){
        return new ResponseEntity<>(appointmentHistoryServices.isAppointmentHistoryExistForDoctorId(doctorId),HttpStatus.OK);
    }
}
