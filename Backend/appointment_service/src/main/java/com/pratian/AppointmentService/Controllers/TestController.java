package com.pratian.AppointmentService.Controllers;

import com.pratian.AppointmentService.Entities.Test;
import com.pratian.AppointmentService.Service.TestServices;
import com.pratian.AppointmentService.Utils.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/tests")
public class TestController {

    @Autowired
    private TestServices testServices;

    @PostMapping("/create/test/appointment/{appointmentId}/new")
    @Operation(summary = "To add new test")
    public ResponseEntity<?> post(@RequestBody Test test, @PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(testServices.addTest(test, appointmentId), HttpStatus.OK);
    }

    @GetMapping("/test/{testId}")
    @Operation(summary = "To get the test details")
    public ResponseEntity<?> getById(@PathVariable(value = "testId")long testId){
        return new ResponseEntity<>(testServices.getTestById(testId), HttpStatus.OK);
    }

    @GetMapping("/appointment/{appointmentId}/all-tests")
    @Operation(summary = "To get the list of tests by appointment Id")
    public ResponseEntity<?> getByAppointment(@PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(testServices.getListOfTestsByAppointment(appointmentId), HttpStatus.OK);
    }

    @PutMapping("/test/{testId}/update")
    @Operation(summary = "To update the test details")
    public ResponseEntity<?> put(@RequestBody Test test, @PathVariable(value = "testId")long testId){
        return new ResponseEntity<>(testServices.editTest(test, testId),HttpStatus.OK);
    }

    @DeleteMapping("/appointment/{appointmentId}/test/{testId}/remove")
    @Operation(summary = "To remove test details")
    public ResponseEntity<ApiResponse> delete(@PathVariable(value = "appointmentId")long appointmentId, @PathVariable(value = "testId")long testId){
        testServices.deleteTest(appointmentId,testId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Test details has been removed successfully", true), HttpStatus.OK);
    }


}
