package com.pratian.SettingsService.Controller;

import com.pratian.SettingsService.Dto.PetDto;
import com.pratian.SettingsService.Entities.Pet;
import com.pratian.SettingsService.Service.PetServices;
import com.pratian.SettingsService.Utils.ApiResponse;
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

    @PostMapping("owner/{ownerId}/pet/new/profile")
    @Operation(summary = "To add new pet")
    public ResponseEntity<?> post(@RequestBody Pet pet, @PathVariable(value = "ownerId")long ownerId){
        return new ResponseEntity<>(petServices.addPet(pet, ownerId), HttpStatus.CREATED);
    }

    @GetMapping("/pet/{petId}/profile")
    @Operation(summary = "To get the pet profile")
    public ResponseEntity<?> getProfile(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(petServices.getPetProfile(petId), HttpStatus.OK);
    }

    @GetMapping("/pet/{petId}/details")
    @Operation(summary = "To get the pet details")
    public ResponseEntity<?> getPetDetails(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(petServices.getPetDetails(petId), HttpStatus.OK);
    }

    @GetMapping("/all-profiles")
    @Operation(summary = "To get the profiles of all pets")
    public ResponseEntity<?> getAllPets(){
        return new ResponseEntity<>(petServices.getAllPets(), HttpStatus.OK);
    }

    @GetMapping("/owner/{ownerId}/pets/all-profiles")
    @Operation(summary = "To get all pet profiles of owner by owner Id")
    public ResponseEntity<?> getPetsByOwnerId(@PathVariable(value = "ownerId")long ownerId){
        return new ResponseEntity<>(petServices.getAllPetsByOwnerId(ownerId), HttpStatus.OK);
    }

    @PutMapping("/owner/{ownerId}/pet/{petId}/update")
    @Operation(summary = "To update the pet profile")
    public ResponseEntity<?> put(@RequestBody PetDto petDto, @PathVariable(value = "ownerId")long ownerId, @PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(petServices.editPetDetails(petDto, ownerId, petId), HttpStatus.OK);
    }

    @DeleteMapping("/owner/{ownerId}/pet/{petId}/remove")
    @Operation(summary = "To remove the pet profile")
    public ResponseEntity<ApiResponse> delete(@PathVariable(value = "ownerId")long ownerId,@PathVariable(value = "petId")long petId){
        petServices.deletePetDetails(ownerId, petId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Pet profile has been removed successfully", true), HttpStatus.OK);
    }


    @GetMapping("exists/pet/{petId}")
    @Operation(summary = "To check if the pet exists")
    public ResponseEntity<?> check(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(petServices.isPetExist(petId), HttpStatus.OK);
    }

    @GetMapping("/pet/{name}/profiles")
    @Operation(summary = "To search pet profiles")
    public ResponseEntity<?> searchPetProfile(@PathVariable(value = "name")String name){
        return new ResponseEntity<>(petServices.searchPetProfile(name), HttpStatus.OK);
    }

    @GetMapping("/check/pet/{name}/profile")
    @Operation(summary = "To check if pet exists by pet name")
    public ResponseEntity<?> getPetByPetName(@PathVariable(value = "name")String name){
        return new ResponseEntity<>(petServices.isPetExistsByName(name),HttpStatus.OK);
    }

}
