package com.pratian.SettingsService.Controller;

import com.pratian.SettingsService.Dto.ReceptionistDto;
import com.pratian.SettingsService.Entities.Receptionist;
import com.pratian.SettingsService.Service.ReceptionistServices;
import com.pratian.SettingsService.Utils.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/receptionists")
public class ReceptionistController {

    @Autowired
    private ReceptionistServices receptionistServices;

    @PostMapping("/create/receptionist/new/profile")
    @Operation(summary = "To add new receptionist profile")
    public ResponseEntity<?> post(@RequestBody Receptionist receptionist){
        return new ResponseEntity<>(receptionistServices.addReceptionistProfile(receptionist), HttpStatus.CREATED);
    }

    @GetMapping("/receptionist/{receptionistId}/profile")
    @Operation(summary = "To get the receptionist profile by id")
    public ResponseEntity<?> get(@PathVariable(value = "receptionistId")long receptionistId){
        return new ResponseEntity<>(receptionistServices.getReceptionistProfile(receptionistId), HttpStatus.OK);
    }

    @GetMapping("/receptionist/username/{username}/profile")
    @Operation(summary = "To get the receptionist profile by username")
    public ResponseEntity<?> getReceptionistByUsername(@PathVariable(value = "username")String username){
        return new ResponseEntity<>(receptionistServices.getReceptionistProfileByUsername(username),HttpStatus.OK);
    }

    @PutMapping("/receptionist/{receptionistId}/update")
    @Operation(summary = "To update receptionist profile")
    public ResponseEntity<?> put(@RequestBody ReceptionistDto receptionistDto, @PathVariable(value = "receptionistId") long receptionistId){
        return new ResponseEntity<>(receptionistServices.editReceptionistProfile(receptionistDto, receptionistId),HttpStatus.OK);
    }

    @DeleteMapping("/receptionist/{receptionistId}/remove")
    @Operation(summary = "To remove receptionist profile")
    public ResponseEntity<ApiResponse> delete(@PathVariable(value = "receptionistId") long receptionistId){
        receptionistServices.deleteReceptionistProfile(receptionistId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Receptionist profile has been removed successfully", true), HttpStatus.OK);
    }
}
