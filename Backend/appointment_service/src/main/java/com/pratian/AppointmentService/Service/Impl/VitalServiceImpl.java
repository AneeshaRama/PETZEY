package com.pratian.AppointmentService.Service.Impl;

import com.pratian.AppointmentService.Entities.Appointment;
import com.pratian.AppointmentService.Entities.Vital;
import com.pratian.AppointmentService.Exceptions.ResourceAlreadyExistsException;
import com.pratian.AppointmentService.Exceptions.ResourceNotFoundException;
import com.pratian.AppointmentService.Repository.AppointmentRepository;
import com.pratian.AppointmentService.Repository.VitalRepository;
import com.pratian.AppointmentService.Service.VitalServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VitalServiceImpl implements VitalServices {

    @Autowired
    private VitalRepository vitalRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    private static final Logger log = LoggerFactory.getLogger(VitalServiceImpl.class);

    @Override
    public Vital addVital(Vital vital, long appointmentId) {
        log.info("Adding vital to appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()-> new ResourceNotFoundException("Appointment not found with appointment Id: "+appointmentId));
        if(appointment.getVital() != null){
            log.error("Vital already exist with vital id "+vital.getVitalId());
            throw new ResourceAlreadyExistsException("Vital already exists");
        }
        Vital newVital = vitalRepository.save(vital);
        appointment.setVital(vital);
        appointmentRepository.save(appointment);
        return newVital;
    }

    @Override
    public Vital getVitalDetails(long vitalId) {
        log.info("Getting vital details with vital id "+vitalId);
        Vital vital = vitalRepository.findById(vitalId).orElseThrow(()-> new ResourceNotFoundException("Vital not found with vital Id: "+vitalId));
        return vital;
    }

    @Override
    public Vital getVitalByAppointment(long appointmentId) {
        log.info("Getting the vital details of appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()-> new ResourceNotFoundException("Appointment not found with appointment Id: "+appointmentId));
        Vital vital = appointment.getVital();
        if(vital == null){
            log.error("Vital not found for appointment id "+appointmentId);
            throw new ResourceNotFoundException("Vital not found");
        }
        return vital;
    }

    @Override
    public Vital editVital(Vital vital, long vitalId) {
        log.info("Updating vital details with vital id "+vitalId);
        Vital existingVital = vitalRepository.findById(vitalId).orElseThrow(()-> new ResourceNotFoundException("Vital not found with vital Id: "+vitalId));
        existingVital.setHeartBpm(vital.getHeartBpm());
        existingVital.setLungsBpm(vital.getLungsBpm());
        existingVital.setTemperature(vital.getTemperature());
        return vitalRepository.save(existingVital);
    }

    @Override
    public void deleteVital(long appointmentId, long vitalId) {
        log.info("Deleting vital for appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()-> new ResourceNotFoundException("Appointment not found with appointment Id: "+appointmentId));

        log.error("Vital not found with vital id "+vitalId);
        Vital vital = vitalRepository.findById(vitalId).orElseThrow(()-> new ResourceNotFoundException("Vital not found with vital Id: "+vitalId));
        appointment.setVital(null);
        appointmentRepository.save(appointment);
        vitalRepository.deleteById(vital.getVitalId());
    }
}
