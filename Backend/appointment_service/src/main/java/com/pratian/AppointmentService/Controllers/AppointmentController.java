package com.pratian.AppointmentService.Controllers;

import com.pratian.AppointmentService.Dto.AppointmentDto;
import com.pratian.AppointmentService.Entities.Appointment;
import com.pratian.AppointmentService.Enums.AppointmentStatus;
import com.pratian.AppointmentService.Service.AppointmentServices;
import com.pratian.AppointmentService.Utils.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;


@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentServices appointmentServices;

    @PostMapping("create/doctor/{doctorId}/owner/{ownerId}/pet/{petId}/new")
    @Operation(summary = "To add new appointment")
    public ResponseEntity<?> post(@RequestBody AppointmentDto appointmentDto, @PathVariable(value = "doctorId")long doctorId,@PathVariable(value="ownerId") long ownerId ,@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(appointmentServices.addNewAppointment(appointmentDto, doctorId, ownerId, petId), HttpStatus.CREATED);
    }

    @GetMapping("/all-appointments")
    @Operation(summary = "To get all appointments")
    public ResponseEntity<?> getAllAppointments(){
        return new ResponseEntity<>(appointmentServices.getAllAppointments(), HttpStatus.OK);
    }

    @GetMapping("/appointment/{appointmentId}/details")
    @Operation(summary = "To get the details of appointment by Id")
    public ResponseEntity<?> getAppointmentDetails(@PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(appointmentServices.getAppointmentDetails(appointmentId),HttpStatus.OK);
    }

    @PutMapping("/appointment/{appointmentId}/update")
    @Operation(summary = "To update the details of appointment")
    public ResponseEntity<?> put(@RequestBody AppointmentDto appointmentDto, @PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(appointmentServices.editAppointmentDetails(appointmentDto, appointmentId),HttpStatus.OK);
    }

    @DeleteMapping("/appointment/{appointmentId}/remove")
    @Operation(summary = "To delete the appointment details")
    public ResponseEntity<ApiResponse> delete(@PathVariable(value = "appointmentId")long appointmentId){
        appointmentServices.deleteAppointmentDetails(appointmentId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Appointment details has been removed successfully", true), HttpStatus.OK);
    }

    @PutMapping("/appointment/{appointmentId}/status/close")
    @Operation(summary = "To close the appointment")
    public ResponseEntity<ApiResponse> closeAppointment(@PathVariable(value = "appointmentId")long appointmentId){
        appointmentServices.closeAppointment(appointmentId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Appointment has been closed successfully", true), HttpStatus.OK);
    }

    @PutMapping("/appointment/{appointmentId}/status/cancel")
    @Operation(summary = "To cancel the appointment")
    public ResponseEntity<ApiResponse> cancelAppointment(@PathVariable(value = "appointmentId")long appointmentId){
        appointmentServices.cancelAppointment(appointmentId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Appointment has been cancelled successfully", true), HttpStatus.OK);
    }

    @PutMapping("/appointment/{appointmentId}/status/confirm")
    @Operation(summary = "To confirm the appointment")
    public ResponseEntity<ApiResponse> confirmAppointment(@PathVariable(value = "appointmentId")long appointmentId){
        appointmentServices.confirmAppointment(appointmentId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Appointment has been confirmed successfully", true), HttpStatus.OK);
    }

    @GetMapping("/status/requested")
    @Operation(summary = "To get the total number of appointment requests")
    public ResponseEntity<?> getTotalAppointRequests(){
        return new ResponseEntity<>(appointmentServices.getNumberOfAppointmentRequests(), HttpStatus.OK);
    }

    @GetMapping("/status/closed")
    @Operation(summary = "To get the total number of closed appointments")
    public ResponseEntity<?> getAllClosedAppointments(){
        return new ResponseEntity<>(appointmentServices.getNumberOfClosedAppointments(), HttpStatus.OK);
    }

    @GetMapping("/status/confirmed")
    @Operation(summary = "To get the total number of confirmed appointments")
    public ResponseEntity<?> getAllConfirmedAppointments(){
        return new ResponseEntity<>(appointmentServices.getNumberOfConfirmedAppointments(), HttpStatus.OK);
    }

    @GetMapping("/status/cancelled")
    @Operation(summary = "To get the total number of cancelled appointments")
    public ResponseEntity<?> getAllCancelledAppointments(){
        return new ResponseEntity<>(appointmentServices.getNumberOfCancelledAppointments(), HttpStatus.OK);
    }

    @GetMapping("/total/appointments")
    @Operation(summary = "To get the total number appointments")
    public ResponseEntity<?> getTotalAppointments(){
        return new ResponseEntity<>(appointmentServices.getTotalNumberOfAppointments(), HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "To get all appointments by status")
    public ResponseEntity<?> getAppointmentsByStatus(@PathVariable(value = "status") AppointmentStatus status){
        return new ResponseEntity<>(appointmentServices.getAppointmentsByStatus(status),HttpStatus.OK);
    }

    @GetMapping("/doctor/{doctorId}")
    @Operation(summary = "To get all appointments by doctor Id")
    public ResponseEntity<?> getAppointmentsByDoctor(@PathVariable(value = "doctorId")long doctorId){
        return new ResponseEntity<>(appointmentServices.getAppointmentsByDoctor(doctorId), HttpStatus.OK);
    }

    @GetMapping("/appointment/{appointmentId}/report")
    @Operation(summary = "To generate the appointment report")
    public ResponseEntity<?> getReport(@PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(appointmentServices.createAppointmentReport(appointmentId), HttpStatus.OK);
    }

    @PutMapping("report/appointment/{appointmentId}/update")
    @Operation(summary = "To edit appointment report")
    public ResponseEntity<?> editReport(@RequestBody Appointment appointment, @PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(appointmentServices.editAppointmentReport(appointment, appointmentId),HttpStatus.OK);
    }

    @GetMapping("/{date}/all-appointments")
    @Operation(summary = "To get appointment details by date")
    public ResponseEntity<?> getAppointmentByDate(@PathVariable(value = "date")String date){
        return new ResponseEntity<>(appointmentServices.getAppointmentByDate(date),HttpStatus.OK);
    }

    @GetMapping("/{date}/all-appointments/dto")
    @Operation(summary = "To get appointment details by date")
    public ResponseEntity<?> getAppointmentDetailsByDate(@PathVariable(value = "date")String date){
        return new ResponseEntity<>(appointmentServices.getAppointmentDetailsByDate(date),HttpStatus.OK);
    }

    @GetMapping("/exists/{date}")
    @Operation(summary = "To check if appointment exist by date")
    public ResponseEntity<?> isAppointmentByDateExist(@PathVariable(value = "date")String date){
        return new ResponseEntity<>(appointmentServices.isAppointmentByDateExist(date),HttpStatus.OK);
    }

    @GetMapping("/appointment/{appointmentId}/doctors/profile")
    @Operation(summary = "To get the doctor recommendation")
    public ResponseEntity<?> getDoctorRecommendation(@PathVariable(value = "appointmentId")long appointmentId ){
        return new ResponseEntity<>(appointmentServices.doctorRecommendation(appointmentId),HttpStatus.OK);
    }

    @GetMapping("/exists/appointment/{appointmentId}")
    @Operation(summary = "To check if appointment exists")
    public ResponseEntity<?> isAppointmentExists(@PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(appointmentServices.isAppointmentExists(appointmentId),HttpStatus.OK);
    }

    @GetMapping("/appointment/{appointmentId}/get-doctor-appointment-dto")
    @Operation(summary = "To get the doctor appointment dto")
    public ResponseEntity<?> getDoctorAppointmentDto(@PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(appointmentServices.getAppointmentById(appointmentId),HttpStatus.OK);
    }

    @GetMapping("/pet/{petId}")
    @Operation(summary = "To get all appointments by pet id")
    public ResponseEntity<?> getAppointmentsByPetId(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(appointmentServices.getAllAppointmentsByPetId(petId), HttpStatus.OK);
    }

    @GetMapping("/check/pet/{petId}")
    @Operation(summary = "To check if appointments exists for pet id")
    public ResponseEntity<?> isAppointmentExistsByPetId(@PathVariable(value = "petId")long petId){
        return new ResponseEntity<>(appointmentServices.isAppointmentExistsForPetId(petId),HttpStatus.OK);
    }

    @GetMapping("/get-clinic-recommendation/{address}")
    @Operation(summary = "To get clinic recommendation")
    public ResponseEntity<?> getClinicRecommendation(@PathVariable(value = "address")String address){
        return new ResponseEntity<>(appointmentServices.getClinicRecommendations(address),HttpStatus.OK);
    }

    @GetMapping("/owner/{ownerId}/details")
    @Operation(summary = "To get all appointments by ownerId")
    public ResponseEntity<?> getAppointmentsByOwnerId(@PathVariable(value="ownerId")long ownerId){
        return new ResponseEntity<>(appointmentServices.getAppointmentsByOwnerId(ownerId), HttpStatus.OK);
    }
}
