package com.pratian.AppointmentService.Controllers;

import com.pratian.AppointmentService.Entities.Medicine;
import com.pratian.AppointmentService.Service.MedicineService;
import com.pratian.AppointmentService.Utils.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/medicines")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping("/create/medicine/prescription/{prescriptionId}/new")
    @Operation(summary = "To add new prescription")
    public ResponseEntity<?> post(@RequestBody Medicine medicine, @PathVariable(value = "prescriptionId")long prescriptionId){
        return new ResponseEntity<>(medicineService.addMedicine(medicine, prescriptionId), HttpStatus.CREATED);
    }

    @GetMapping("/medicine/{medicineId}")
    @Operation(summary = "To get the medicine details by Id")
    public ResponseEntity<?> get(@PathVariable(value = "medicineId")long medicineId){
        return new ResponseEntity<>(medicineService.getMedicineDetailsById(medicineId), HttpStatus.OK);
    }

    @GetMapping("/prescription/{prescriptionId}/all-medicines")
    @Operation(summary = "To get all the medicines of prescription")
    public ResponseEntity<?> getAllMedicines(@PathVariable(value = "prescriptionId")long prescriptionId){
        return new ResponseEntity<>(medicineService.getAllMedicines(prescriptionId),HttpStatus.OK);
    }

    @PutMapping("/medicine/{medicineId}/update")
    @Operation(summary = "To update medicine details")
    public ResponseEntity<?> put(@RequestBody Medicine medicine, @PathVariable(value = "medicineId")long medicineId){
        return new ResponseEntity<>(medicineService.editMedicine(medicine, medicineId), HttpStatus.OK);
    }

    @DeleteMapping("prescription/{prescriptionId}/medicine/{medicineId}/remove")
    @Operation(summary = "To remove medicine Details")
    public ResponseEntity<ApiResponse> delete(@PathVariable(value = "prescriptionId")long prescriptionId, @PathVariable(value = "medicineId")long medicineId){
        medicineService.deleteMedicine(prescriptionId, medicineId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Medicine details has been removed successfully", true),HttpStatus.OK);
    }
}
