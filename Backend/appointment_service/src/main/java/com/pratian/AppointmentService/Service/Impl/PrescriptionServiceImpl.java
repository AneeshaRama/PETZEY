package com.pratian.AppointmentService.Service.Impl;

import com.pratian.AppointmentService.Dto.PrescriptionDto;
import com.pratian.AppointmentService.Entities.Appointment;
import com.pratian.AppointmentService.Entities.Prescription;
import com.pratian.AppointmentService.Exceptions.ResourceAlreadyExistsException;
import com.pratian.AppointmentService.Exceptions.ResourceNotFoundException;
import com.pratian.AppointmentService.Repository.AppointmentRepository;
import com.pratian.AppointmentService.Repository.PrescriptionRepository;
import com.pratian.AppointmentService.Service.AppointmentServices;
import com.pratian.AppointmentService.Service.PrescriptionService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AppointmentServices appointmentServices;

    private static final Logger log = LoggerFactory.getLogger(PrescriptionServiceImpl.class);

    @Override
    public PrescriptionDto addPrescription(PrescriptionDto prescriptionDto, long appointmentId) {
        log.info("Adding prescription for appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()-> new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        if(appointment.getPrescription() != null){
            log.error("Prescription already exist for appointment id "+appointmentId);
            throw new ResourceAlreadyExistsException("Prescription already exist");
        }
        Prescription prescription = modelMapper.map(prescriptionDto,Prescription.class);
        Prescription newPrescription = prescriptionRepository.save(prescription);
        appointment.setPrescription(newPrescription);
        appointmentRepository.save(appointment);
        PrescriptionDto newPrescriptionDto = modelMapper.map(newPrescription, PrescriptionDto.class);
        return newPrescriptionDto;
    }

    @Override
    public Prescription getPrescriptionById(long prescriptionId) {
        log.info("Getting prescription with prescription id "+prescriptionId);
        Prescription prescription = prescriptionRepository.findById(prescriptionId).orElseThrow(()->new ResourceNotFoundException("Prescription not found with prescription Id: "+prescriptionId));
        return prescription;
    }

    @Override
    public Prescription getPrescriptionByAppointment(long appointmentId) {
        log.info("Getting prescription for appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()-> new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        Prescription prescription = appointment.getPrescription();
        return prescription;
    }

    @Override
    public List<Prescription> getAllPrescriptions() {
        log.info("Getting all prescriptions");
        List<Prescription> prescriptions = prescriptionRepository.findAll();
        if(prescriptions.isEmpty()){
            log.error("Prescriptions not found");
            throw new ResourceNotFoundException("Prescriptions not found");
        }
        return prescriptions;
    }

    @Override
    public PrescriptionDto editPrescription(PrescriptionDto prescriptionDto, long prescriptionId) {
        log.info("Updating prescription details with prescription id "+prescriptionId);
        Prescription existingPrescription = prescriptionRepository.findById(prescriptionId).orElseThrow(()->new ResourceNotFoundException("Prescription not found with prescription Id: "+prescriptionId));
        existingPrescription.setPrescriptionDate(prescriptionDto.getPrescriptionDate());
        prescriptionRepository.save(existingPrescription);
        return modelMapper.map(existingPrescription, PrescriptionDto.class);
    }

    @Override
    public void deletePrescription(long appointmentId, long prescriptionId) {
        log.info("Deleting prescription for appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()-> new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));

        log.error("Prescription not found with prescription id "+prescriptionId);
        Prescription prescription = prescriptionRepository.findById(prescriptionId).orElseThrow(()->new ResourceNotFoundException("Prescription not found with prescription Id: "+prescriptionId));
        appointment.setPrescription(null);
        appointmentRepository.save(appointment);
        prescriptionRepository.deleteById(prescription.getPrescriptionId());

    }

    @Override
    public List<Prescription> getPrescriptionHistoriesByPetId(long petId) {
        List<Appointment> appointments = appointmentServices.getAllAppointmentsByPetId(petId);
        if(appointments.isEmpty()){
            throw new ResourceNotFoundException("Appointments not found");
        }
        List<Prescription> prescriptions = new ArrayList<>();
        for(Appointment appointment : appointments){
            prescriptions.add(appointment.getPrescription());
        }
        return prescriptions;
    }

    @Override
    public boolean isPrescriptionHistoriesByPetId(long petId) {
        List<Prescription> prescriptions = getPrescriptionHistoriesByPetId(petId);
        return !prescriptions.isEmpty();
    }

    @Override
    public boolean isPrescriptionHistoryExistsByDate(long petId,String date) {
        PrescriptionDto prescription = getPrescriptionByDate(petId, date);
        return prescription != null;
    }

    @Override
    public PrescriptionDto getPrescriptionByDate(long petId, String date) {
        List<Prescription> prescriptions = getPrescriptionHistoriesByPetId(petId);
        if(!prescriptions.isEmpty()){
            for (Prescription prescription : prescriptions){
                if(prescription.getPrescriptionDate().equals(date)){
                    return modelMapper.map(prescription, PrescriptionDto.class);
                }
            }
        }
        throw new ResourceNotFoundException("Prescription not found");
    }
}
