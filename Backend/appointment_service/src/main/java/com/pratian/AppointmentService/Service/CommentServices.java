package com.pratian.AppointmentService.Service;

import com.pratian.AppointmentService.Entities.Comment;

public interface CommentServices {

    Comment addComment(Comment comment, long appointmentId);

    Comment getCommentById(long commentId);

    Comment getCommentByAppointmentId(long appointmentId);

    Comment editComment(Comment comment, long commentId);

    void deleteComment(long appointmentId, long commentId);
}
