package com.pratian.AppointmentService.Service.Impl;

import com.pratian.AppointmentService.Entities.Appointment;
import com.pratian.AppointmentService.Entities.Test;
import com.pratian.AppointmentService.Exceptions.ResourceAlreadyExistsException;
import com.pratian.AppointmentService.Exceptions.ResourceNotFoundException;
import com.pratian.AppointmentService.Repository.AppointmentRepository;
import com.pratian.AppointmentService.Repository.TestRepository;
import com.pratian.AppointmentService.Service.TestServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestServiceImpl implements TestServices {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    private static final Logger log = LoggerFactory.getLogger(TestServiceImpl.class);

    @Override
    public Test addTest(Test test, long appointmentId) {
        log.info("Adding test for appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()-> new ResourceNotFoundException("Appointment not found with appointment Id: "+appointmentId));
        if(testRepository.existsById(test.getTestId())){
            log.error("Test already exist with test id "+test.getTestId());
            throw new ResourceAlreadyExistsException("Test already exists");
        }
        Test newTest = testRepository.save(test);
        appointment.getTests().add(newTest);
        appointmentRepository.save(appointment);
        return newTest;
    }

    @Override
    public Test getTestById(long testId) {
        log.info("Getting test details of test id "+testId);
        Test test = testRepository.findById(testId).orElseThrow(()-> new ResourceNotFoundException("Test not found with test Id: "+testId));
        return test;
    }

    @Override
    public List<Test> getListOfTestsByAppointment(long appointmentId) {
        log.info("Get all test details of appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()-> new ResourceNotFoundException("Appointment not found with appointment Id: "+appointmentId));
        List<Test> tests = appointment.getTests();
        if(tests.isEmpty()){
            log.error("Tests not found for appointment id "+appointmentId);
            throw new ResourceNotFoundException("Tests not found");
        }
        return tests;
    }

    @Override
    public Test editTest(Test test, long testId) {
        log.info("Updating test details with test id "+testId);
        Test existingTest = testRepository.findById(testId).orElseThrow(()-> new ResourceNotFoundException("Test not found with test Id: "+testId));
        existingTest.setTestName(test.getTestName());
        return testRepository.save(existingTest);
    }

    @Override
    public void deleteTest(long appointmentId, long testId) {
        log.info("Deleting test for appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()-> new ResourceNotFoundException("Appointment not found with appointment Id: "+appointmentId));

        log.error("Test not found with appointment id "+appointmentId);
        Test test = testRepository.findById(testId).orElseThrow(()-> new ResourceNotFoundException("Test not found with test Id: "+testId));
        appointment.getTests().remove(test);
        appointmentRepository.save(appointment);
        testRepository.deleteById(test.getTestId());
    }
}
