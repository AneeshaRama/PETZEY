package com.pratian.AppointmentService.Controllers;

import com.pratian.AppointmentService.Entities.Vital;
import com.pratian.AppointmentService.Service.VitalServices;
import com.pratian.AppointmentService.Utils.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/vitals")
public class VitalController {

    @Autowired
    private VitalServices vitalServices;

    @PostMapping("/create/vital/appointment/{appointmentId}/new")
    @Operation(summary = "To add new vital")
    public ResponseEntity<?> post(@RequestBody Vital vital, @PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(vitalServices.addVital(vital, appointmentId), HttpStatus.OK);
    }

    @GetMapping("/vital/{vitalId}")
    @Operation(summary = "To get the details of vital by vital Id")
    public ResponseEntity<?> getVitalById(@PathVariable(value = "vitalId")long vitalId){
        return new ResponseEntity<>(vitalServices.getVitalDetails(vitalId), HttpStatus.OK);
    }

    @GetMapping("/appointment/{appointmentId}/vital")
    @Operation(summary = "To get the vital by appointment Id")
    public ResponseEntity<?> getVitalByAppointment(@PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(vitalServices.getVitalByAppointment(appointmentId), HttpStatus.OK);
    }

    @PutMapping("/vital/{vitalId}/update")
    @Operation(summary = "To update vital")
    public ResponseEntity<?> put(@RequestBody Vital vital, @PathVariable(value = "vitalId")long vitalId){
        return new ResponseEntity<>(vitalServices.editVital(vital, vitalId),HttpStatus.OK);
    }

    @DeleteMapping("/appointment/{appointmentId}/vital/{vitalId}/remove")
    @Operation(summary = "To remove vital")
    public ResponseEntity<ApiResponse> delete(@PathVariable(value = "appointmentId")long appointmentId, @PathVariable(value = "vitalId")long vitalId){
        vitalServices.deleteVital(appointmentId,vitalId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Vital details has been removed successfully", true),HttpStatus.OK);
    }
}
