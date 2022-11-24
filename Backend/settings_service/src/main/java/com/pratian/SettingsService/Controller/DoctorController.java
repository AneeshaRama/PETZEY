package com.pratian.SettingsService.Controller;

import com.pratian.SettingsService.Dto.DoctorDto;
import com.pratian.SettingsService.Entities.Doctor;
import com.pratian.SettingsService.Service.DoctorServices;
import com.pratian.SettingsService.Utils.ApiResponse;
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

    @PostMapping("/create/new/profile")
    @Operation(summary = "To add new doctor profile")
    public ResponseEntity<?> post(@RequestBody Doctor doctor){
        return new ResponseEntity<>(doctorServices.addDoctorProfile(doctor), HttpStatus.CREATED);
    }

    @GetMapping("/doctor/{doctorId}/profile")
    @Operation(summary = "To get the doctor profile")
    public ResponseEntity<?> getDoctorProfile(@PathVariable(value = "doctorId") long doctorId){
        return new ResponseEntity<>(doctorServices.getDoctorProfile(doctorId), HttpStatus.OK);
    }

    @GetMapping("/doctor/username/{username}/profile")
    @Operation(summary = "To get the doctor profile by username")
    public ResponseEntity<?> getDoctorByUsername(@PathVariable(value = "username")String username){
        return new ResponseEntity<>(doctorServices.getDoctorByUsername(username),HttpStatus.OK);
    }

    @GetMapping("/all-profiles")
    @Operation(summary = "To get the profiles of all doctors")
    public ResponseEntity<?> getAllProfiles(){
        return new ResponseEntity<>(doctorServices.getAllDoctorProfiles(), HttpStatus.OK);
    }


    @PutMapping("/doctor/{doctorId}/update")
    @Operation(summary = "To update the doctor profile")
    public ResponseEntity<?> put(@RequestBody DoctorDto doctorDto, @PathVariable(value = "doctorId")long doctorId){
        return new ResponseEntity<>(doctorServices.editDoctorProfile(doctorDto, doctorId), HttpStatus.OK);
    }

    @DeleteMapping("/doctor/{doctorId}/remove")
    @Operation(summary = "To remove the doctor profile")
    public ResponseEntity<ApiResponse> delete(@PathVariable(value = "doctorId")long doctorId){
        doctorServices.deleteDoctorProfile(doctorId);
        return new ResponseEntity<>(new ApiResponse("Doctor profile has been removed successfully",true), HttpStatus.OK);
    }

    @GetMapping("exists/doctor/{doctorId}")
    @Operation(summary = "To check if doctor exists")
    public ResponseEntity<?> check(@PathVariable(value = "doctorId")long doctorId){
        return new ResponseEntity<>(doctorServices.isDoctorExists(doctorId), HttpStatus.OK);
    }

    @GetMapping("/doctor/{name}/profiles")
    @Operation(summary = "To search doctor profiles")
    public ResponseEntity<?> searchDoctorProfiles(@PathVariable(value = "name")String name){
        return new ResponseEntity<>(doctorServices.searchDoctorProfiles(name),HttpStatus.OK);
    }

    @GetMapping("/doctor/{speciality}/get-all-profiles")
    @Operation(summary = "To get the doctor profiles by speciality")
    public ResponseEntity<?> getDoctorsBySpeciality(@PathVariable(value = "speciality")String speciality){
        return new ResponseEntity<>(doctorServices.getDoctorsBySpeciality(speciality),HttpStatus.OK);
    }


    @GetMapping("/appointment/{appointmentId}/doctor/profile")
    @Operation(summary = "To get the doctor profile by appointment Id")
    public ResponseEntity<?> getDoctorByAppointmentId(@PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(doctorServices.getDoctorProfileByAppointmentId(appointmentId),HttpStatus.OK);
    }

}
