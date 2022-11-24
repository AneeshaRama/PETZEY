package com.pratian.AppointmentService.Controllers;

import com.pratian.AppointmentService.Dto.PrescriptionDto;
import com.pratian.AppointmentService.Service.PrescriptionService;
import com.pratian.AppointmentService.Utils.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/prescriptions")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    @PostMapping("/create/prescription/appointment/{appointmentId}/new")
    @Operation(summary = "To add new prescription")
    public ResponseEntity<?> post(@RequestBody PrescriptionDto prescriptionDto, @PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(prescriptionService.addPrescription(prescriptionDto, appointmentId), HttpStatus.CREATED);
    }

    @GetMapping("/prescription/{prescriptionId}")
    @Operation(summary = "To get the prescription details by Id")
    public ResponseEntity<?> get(@PathVariable(value = "prescriptionId")long prescriptionId){
        return new ResponseEntity<>(prescriptionService.getPrescriptionById(prescriptionId), HttpStatus.OK);
    }

    @GetMapping("/appointment/{appointmentId}/prescription")
    @Operation(summary = "To get the details of prescription by appointment Id")
    public ResponseEntity<?> getByAppointment(@PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(prescriptionService.getPrescriptionByAppointment(appointmentId), HttpStatus.OK);
    }

    @PutMapping("/prescription/{prescriptionId}/update")
    @Operation(summary = "To update prescription")
    public ResponseEntity<?> put(@RequestBody PrescriptionDto prescriptionDto, @PathVariable(value = "prescriptionId") long prescriptionId){
        return new ResponseEntity<>(prescriptionService.editPrescription(prescriptionDto, prescriptionId),HttpStatus.OK);
    }

    @DeleteMapping("/appointment/{appointmentId}/prescription/{prescriptionId}/remove")
    @Operation(summary = "To remove prescription")
    public ResponseEntity<ApiResponse> delete(@PathVariable(value = "appointmentId")long appointmentId,@PathVariable(value = "prescriptionId")long prescriptionId){
        prescriptionService.deletePrescription(appointmentId,prescriptionId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Prescription has been removed successfully", true), HttpStatus.OK);
    }

    @GetMapping("/pet/{petId}/prescription-histories")
    @Operation(summary = "To get the prescription histories")
    public ResponseEntity<?> getPrescriptionHistoriesByPetId(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(prescriptionService.getPrescriptionHistoriesByPetId(petId),HttpStatus.OK);
    }

    @GetMapping("/check/pet/{petId}")
    @Operation(summary = "To check if prescription histories by pet id")
    public ResponseEntity<?> isPrescriptionHistoriesExistForPetId(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(prescriptionService.isPrescriptionHistoriesByPetId(petId),HttpStatus.OK);
    }

    @GetMapping("/prescription/pet/{petId}/date/{date}")
    @Operation(summary = "To get prescription by prescription date")
    public ResponseEntity<?> getPrescriptionByDate(@PathVariable(value = "petId")long petId ,@PathVariable(value = "date")String date){
        return new ResponseEntity<>(prescriptionService.getPrescriptionByDate(petId, date), HttpStatus.OK);
    }

    @GetMapping("/check/prescription/pet/{petId}/date/{date}")
    @Operation(summary = "To check if prescription exists on given date")
    public ResponseEntity<?> isPrescriptionExistsByDate(@PathVariable(value = "petId")long petId,@PathVariable(value = "date")String date){
        return new ResponseEntity<>(prescriptionService.isPrescriptionHistoryExistsByDate(petId,date),HttpStatus.OK);
    }

    @GetMapping("/all-prescriptions")
    @Operation(summary = "To get all prescriptions")
    public ResponseEntity<?> getAllPrescriptions(){
        return new ResponseEntity<>(prescriptionService.getAllPrescriptions(), HttpStatus.OK);
    }
}
