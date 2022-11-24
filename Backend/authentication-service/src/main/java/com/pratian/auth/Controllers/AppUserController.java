package com.pratian.auth.Controllers;

import com.pratian.auth.Entities.Doctor;
import com.pratian.auth.Entities.PetOwner;
import com.pratian.auth.Entities.Receptionist;
import com.pratian.auth.Services.AppUserServices;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AppUserController {

    @Autowired
    private AppUserServices appUserServices;

    @PostMapping("/pet-owner/register")
    @Operation(summary = "To register new Pet owner")
    public ResponseEntity<?> registerPetOwner(@RequestBody PetOwner petOwner){
        return new ResponseEntity<>(appUserServices.registerPetOwner(petOwner), HttpStatus.CREATED);
    }

    @PostMapping("/doctor/register")
    @Operation(summary = "To register new doctor")
    public ResponseEntity<?> registerDoctor(@RequestBody Doctor doctor){
        return new ResponseEntity<>(appUserServices.registerDoctor(doctor),HttpStatus.CREATED);
    }

    @PostMapping("/receptionist/register")
    @Operation(summary = "To register new receptionist")
    public ResponseEntity<?> registerReceptionist(@RequestBody Receptionist receptionist){
        return new ResponseEntity<>(appUserServices.registerReceptionist(receptionist),HttpStatus.CREATED);
    }
}
