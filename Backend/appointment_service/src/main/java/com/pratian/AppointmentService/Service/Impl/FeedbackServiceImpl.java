package com.pratian.AppointmentService.Service.Impl;

import com.pratian.AppointmentService.Entities.Appointment;
import com.pratian.AppointmentService.Entities.Feedback;
import com.pratian.AppointmentService.Exceptions.ResourceAlreadyExistsException;
import com.pratian.AppointmentService.Exceptions.ResourceNotFoundException;
import com.pratian.AppointmentService.Repository.AppointmentRepository;
import com.pratian.AppointmentService.Repository.FeedbackRepository;
import com.pratian.AppointmentService.Service.FeedbackServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackServiceImpl implements FeedbackServices {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    private static final Logger log = LoggerFactory.getLogger(FeedbackServiceImpl.class);

    @Override
    public Feedback addFeedback(Feedback feedback, long appointmentId) {
        log.info("Adding feedback for appointment of appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        if(appointment.getFeedback() != null){
            log.error("Feedback already exist for appointment id "+appointmentId);
            throw new ResourceAlreadyExistsException("Feedback already exists");
        }
        Feedback newFeedback = feedbackRepository.save(feedback);
        appointment.setFeedback(newFeedback);
        appointmentRepository.save(appointment);
        return newFeedback;
    }

    @Override
    public Feedback getFeedbackById(long feedbackId) {
        log.info("Getting feedback with feedback id "+feedbackId);
        Feedback feedback = feedbackRepository.findById(feedbackId).orElseThrow(()->new ResourceNotFoundException("Feedback not found with feedback Id: "+feedbackId));
        return feedback;
    }

    @Override
    public Feedback getFeedbackByAppointment(long appointmentId) {
        log.info("Getting feedback of appointment of appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        Feedback feedback = appointment.getFeedback();
        return feedback;
    }

    @Override
    public Feedback editFeedback(Feedback feedback, long feedbackId) {
        log.info("Updating feedback with feedback id "+feedbackId);
        Feedback existingFeedback = feedbackRepository.findById(feedbackId).orElseThrow(()->new ResourceNotFoundException("Feedback not found with feedback Id: "+feedbackId));
        existingFeedback.setRatings(feedback.getRatings());
        existingFeedback.setAdditionalComment(feedback.getAdditionalComment());
        return feedbackRepository.save(existingFeedback);
    }

    @Override
    public void deleteFeedback(long appointmentId, long feedbackId) {
        log.info("Deleting feedback of appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));

        log.error("Feedback not found with feedback id "+feedbackId);
        Feedback feedback = feedbackRepository.findById(feedbackId).orElseThrow(()->new ResourceNotFoundException("Feedback not found with feedback Id: "+feedbackId));
        appointment.setFeedback(null);
        appointmentRepository.save(appointment);
        feedbackRepository.deleteById(feedback.getFeedBackId());
    }
}
