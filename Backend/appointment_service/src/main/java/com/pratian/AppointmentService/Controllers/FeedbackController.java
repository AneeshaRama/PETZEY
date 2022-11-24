package com.pratian.AppointmentService.Controllers;

import com.pratian.AppointmentService.Entities.Feedback;
import com.pratian.AppointmentService.Service.FeedbackServices;
import com.pratian.AppointmentService.Utils.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackServices feedbackServices;

    @PostMapping("/create/feedback/appointment/{appointmentId}/new")
    @Operation(summary = "To add new feedback")
    public ResponseEntity<?> post(@RequestBody Feedback feedback, @PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(feedbackServices.addFeedback(feedback, appointmentId), HttpStatus.CREATED);
    }

    @GetMapping("/feedback/{feedbackId}")
    @Operation(summary = "To get the feedback details by Id")
    public ResponseEntity<?> getById(@PathVariable(value = "feedbackId")long feedbackId){
        return new ResponseEntity<>(feedbackServices.getFeedbackById(feedbackId), HttpStatus.OK);
    }

    @GetMapping("/appointment/{appointmentId}/feedback")
    @Operation(summary = "To get the details of feedback from appointment Id")
    public ResponseEntity<?> getByAppointment(@PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(feedbackServices.getFeedbackByAppointment(appointmentId), HttpStatus.OK);
    }

    @PutMapping("/feedback/{feedbackID}/update")
    @Operation(summary = "To update the feedback details")
    public ResponseEntity<?> put(@RequestBody Feedback feedback, @PathVariable(value = "feedbackId")long feedbackId){
        return new ResponseEntity<>(feedbackServices.editFeedback(feedback, feedbackId), HttpStatus.OK);
    }

    @DeleteMapping("/appointment/{appointmentId}/feedback/{feedbackId}/remove")
    @Operation(summary = "To remove feedback details")
    public ResponseEntity<ApiResponse> delete(@PathVariable(value = "appointmentId")long appointmentId, @PathVariable(value = "feedbackId")long feedbackId){
        feedbackServices.deleteFeedback(appointmentId, feedbackId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Feedback details has been removed successfully", true), HttpStatus.OK);
    }
}
