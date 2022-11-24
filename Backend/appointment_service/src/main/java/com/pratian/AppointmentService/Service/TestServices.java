package com.pratian.AppointmentService.Service;

import com.pratian.AppointmentService.Entities.Test;

import java.util.List;

public interface TestServices {

    Test addTest(Test test, long appointmentId);

    Test getTestById(long testId);

    List<Test> getListOfTestsByAppointment(long appointmentId);

    Test editTest(Test test, long testId);

    void deleteTest(long appointmentId, long testId);
}
