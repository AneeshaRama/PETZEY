package com.pratian.AppointmentService.Service;

import com.pratian.AppointmentService.Entities.Feedback;

public interface FeedbackServices {

    Feedback addFeedback(Feedback feedback, long appointmentId);

    Feedback getFeedbackById(long feedbackId);

    Feedback getFeedbackByAppointment(long appointmentId);

    Feedback editFeedback(Feedback feedback, long feedbackId);

    void deleteFeedback(long appointmentId, long feedbackId);
}
