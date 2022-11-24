package com.pratian.AppointmentService.Service.Impl;

import com.pratian.AppointmentService.Entities.Appointment;
import com.pratian.AppointmentService.Entities.Comment;
import com.pratian.AppointmentService.Exceptions.ResourceAlreadyExistsException;
import com.pratian.AppointmentService.Exceptions.ResourceNotFoundException;
import com.pratian.AppointmentService.Repository.AppointmentRepository;
import com.pratian.AppointmentService.Repository.CommentRepository;
import com.pratian.AppointmentService.Service.CommentServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentServices {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    private static final Logger log = LoggerFactory.getLogger(CommentServiceImpl.class);

    @Override
    public Comment addComment(Comment comment, long appointmentId) {
        log.info("Adding comment for appointment of appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        if(appointment.getComment() != null){
            log.error("Comment already exists for appointment id "+appointmentId);
            throw new ResourceAlreadyExistsException("Comment already exists");
        }
        Comment newComment = commentRepository.save(comment);
        appointment.setComment(newComment);
        appointmentRepository.save(appointment);
        return newComment;
    }

    @Override
    public Comment getCommentById(long commentId) {
        log.info("Getting comment with comment id "+commentId);
        Comment comment = commentRepository.findById(commentId).orElseThrow(()->new ResourceNotFoundException("Comment not found with comment Id: "+ commentId));
        return comment;
    }

    @Override
    public Comment getCommentByAppointmentId(long appointmentId) {
        log.info("Getting comment for appointment of appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        Comment comment = appointment.getComment();
        return comment;
    }

    @Override
    public Comment editComment(Comment comment, long commentId) {
        log.info("Updating the comment with comment id "+commentId);
        Comment existingComment = commentRepository.findById(commentId).orElseThrow(()->new ResourceNotFoundException("Comment not found with comment Id: "+ commentId));
        existingComment.setDescription(comment.getDescription());
        return commentRepository.save(existingComment);
    }

    @Override
    public void deleteComment(long appointmentId, long commentId) {
        log.info("Deleting comment of appointment of appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        log.error("Comment not found with comment id "+commentId);
        Comment comment = commentRepository.findById(commentId).orElseThrow(()->new ResourceNotFoundException("Comment not found with comment Id: "+ commentId));
        appointment.setComment(null);
        appointmentRepository.save(appointment);
        commentRepository.deleteById(comment.getCommentId());
    }
}
