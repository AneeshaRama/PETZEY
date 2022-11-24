package com.pratian.SettingsService.Controller;

import com.pratian.SettingsService.Dto.PetOwnerDto;
import com.pratian.SettingsService.Service.PetOwnerServices;
import com.pratian.SettingsService.Utils.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/owners")
public class PetOwnerController {

    @Autowired
    private PetOwnerServices petOwnerServices;

    @PostMapping("create/owner/new/profile")
    @Operation(summary = "To add new pet owner profile")
    public ResponseEntity<?> post(@RequestBody PetOwnerDto owner){
        return new ResponseEntity<>(petOwnerServices.addPetOwner(owner), HttpStatus.CREATED);
    }

    @GetMapping("/owner/{ownerId}/details")
    @Operation(summary = "To get the details of pet owner")
    public ResponseEntity<?> getOwnerDetails(@PathVariable(value = "ownerId")long ownerId){
        return new ResponseEntity<>(petOwnerServices.getPetOwnerDetails(ownerId),HttpStatus.OK);
    }

    @GetMapping("/owner/{ownerId}/profile")
    @Operation(summary = "To get the profile of pet owner")
    public ResponseEntity<?> get(@PathVariable(value = "ownerId")long ownerId){
        return new ResponseEntity<>(petOwnerServices.getPetOwnerProfile(ownerId), HttpStatus.OK);
    }

    @GetMapping("/owner/username/{username}/profile")
    @Operation(summary = "To get the pet owner profile by username")
    public ResponseEntity<?> getPetOwnerByUsername(@PathVariable(value = "username")String username){
        return new ResponseEntity<>(petOwnerServices.getPetOwnerProfileByUsername(username),HttpStatus.OK);
    }

    @GetMapping("/owner/pet/{petId}")
    @Operation(summary = "To get the owner profile by pet Id")
    public ResponseEntity<?> getOwnerByPetId(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(petOwnerServices.getPetOwnerProfileByPetId(petId), HttpStatus.OK);
    }

    @PutMapping("/owner/{ownerId}/update")
    @Operation(summary = "To update the pet owner profile")
    public ResponseEntity<?> put(@RequestBody PetOwnerDto ownerDto, @PathVariable(value = "ownerId")long ownerId){
        return new ResponseEntity<>(petOwnerServices.editPetOwner(ownerDto, ownerId), HttpStatus.OK);
    }

    @DeleteMapping("/owner/{ownerId}/remove")
    @Operation(summary = "To remove the pet owner profile")
    public ResponseEntity<ApiResponse> delete(@PathVariable(value = "ownerId")long ownerId){
        petOwnerServices.deletePetOwnerProfile(ownerId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Pet owner profile has been removed successfully", true), HttpStatus.OK);
    }

}
