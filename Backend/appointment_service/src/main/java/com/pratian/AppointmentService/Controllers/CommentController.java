package com.pratian.AppointmentService.Controllers;

import com.pratian.AppointmentService.Entities.Comment;
import com.pratian.AppointmentService.Service.CommentServices;
import com.pratian.AppointmentService.Utils.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentServices commentServices;

    @PostMapping("/create/comment/appointment/{appointmentId}/new")
    @Operation(summary = "To add new comment")
    public ResponseEntity<?> post(@RequestBody Comment comment, @PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(commentServices.addComment(comment, appointmentId), HttpStatus.CREATED);
    }

    @GetMapping("/comment/{commentId}")
    @Operation(summary = "To get the comment by comment Id")
    public ResponseEntity<?> getById(@PathVariable(value = "commentId")long commentId){
        return new ResponseEntity<>(commentServices.getCommentById(commentId), HttpStatus.OK);
    }

    @GetMapping("/appointment/{appointmentId}/comment/{commentId}")
    @Operation(summary = "To get the comment")
    public ResponseEntity<?> getByAppointmentId(@PathVariable(value = "appointmentId")long appointmentId){
        return new ResponseEntity<>(commentServices.getCommentByAppointmentId(appointmentId),HttpStatus.OK);
    }

    @PutMapping("/comment/{commentId}/update")
    @Operation(summary = "To update the comment")
    public ResponseEntity<?> put(@RequestBody Comment comment, @PathVariable(value = "commentId")long commentId){
        return new ResponseEntity<>(commentServices.editComment(comment, commentId), HttpStatus.OK);
    }

    @DeleteMapping("/appointment/{appointmentId}/comment/{commentId}/remove")
    @Operation(summary = "To remove comment")
    public ResponseEntity<ApiResponse> delete(@PathVariable(value = "appointmentId")long appointmentId, @PathVariable(value = "commentId")long commentId){
        commentServices.deleteComment(appointmentId, commentId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Comment has been removed successfully", true), HttpStatus.OK);
    }
}
