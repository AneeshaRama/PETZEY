package com.pratian.AppointmentService.Service.Impl;

import com.pratian.AppointmentService.Dto.AppointmentHistoryDto;
import com.pratian.AppointmentService.Entities.*;
import com.pratian.AppointmentService.Exceptions.ResourceAlreadyExistsException;
import com.pratian.AppointmentService.Exceptions.ResourceNotFoundException;
import com.pratian.AppointmentService.Repository.AppointmentHistoryRepository;
import com.pratian.AppointmentService.Repository.AppointmentRepository;
import com.pratian.AppointmentService.Service.AppointmentHistoryServices;
import com.pratian.AppointmentService.Service.AppointmentServices;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentHistoryServiceImpl implements AppointmentHistoryServices {

    @Autowired
    private AppointmentHistoryRepository appointmentHistoryRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentServices appointmentServices;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private RestTemplate restTemplate;

    @Value(value = "${rest.settingService}")
    String settingServiceUrl;

    private static final Logger log = LoggerFactory.getLogger(AppointmentHistoryServiceImpl.class);

    @Override
    public AppointmentHistoryDto createAppointmentHistory(long appointmentId) {
        log.info("Adding appointment history for appointment of appointment id "+ appointmentId);
        AppointmentHistory appointmentHistory = new AppointmentHistory();
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+appointmentId));

        appointmentHistory.setAppointmentId(appointment.getAppointmentId());
        System.out.println(appointmentHistory.getAppointmentId());

        Pet pet = restTemplate.getForObject(settingServiceUrl+"/pets/pet/"+appointment.getPetId()+"/profile", Pet.class);

        Doctor doctor = restTemplate.getForObject(settingServiceUrl+"/doctors/doctor/"+appointment.getDoctorId()+"/profile", Doctor.class);

        PetOwner owner = restTemplate.getForObject(settingServiceUrl+"/owners/owner/pet/"+appointment.getPetId(), PetOwner.class);

        appointmentHistory.setPetName(pet.getPetName());
        appointmentHistory.setDoctorName(doctor.getDoctorName());
        appointmentHistory.setOwnerName(owner.getOwnerName());
        appointmentHistory.setAppointmentDate(appointment.getAppointmentDate());
        appointmentHistory.setAppointmentTime(appointment.getAppointmentTime());
        appointmentHistory.setPetId(pet.getPetId());
        appointmentHistory.setDoctorId(doctor.getDoctorId());

        System.out.println(appointmentHistory);


        if(appointment.getAppointmentHistory() != null){
            log.error("Appointment history already exist for appointment id "+appointment);
            throw new ResourceAlreadyExistsException("Appointment history already exists");
        }

        if(appointmentHistoryRepository.existsById(appointmentHistory.getAppointmentHistoryId())){
            log.error("Appointment history already exist for appointment id "+appointment);
            throw new ResourceAlreadyExistsException("Appointment history already exists");
        }

        AppointmentHistory newAppointmentHistory = appointmentHistoryRepository.save(appointmentHistory);

        appointment.setAppointmentHistory(newAppointmentHistory);

        appointmentRepository.save(appointment);

        AppointmentHistoryDto appointmentHistoryDto = modelMapper.map(newAppointmentHistory, AppointmentHistoryDto.class);

        return appointmentHistoryDto;
    }

    @Override
    public List<AppointmentHistoryDto> getAppointmentHistoryDtoByPetId(long petId) {
        log.info("Getting appointment histories for pet of pet id "+petId);
        if(appointmentServices.isPetExist(petId)){
            List<AppointmentHistory> appointmentHistories = appointmentHistoryRepository.getAppointmentHistoryByPetId(petId);
            if(appointmentHistories.isEmpty()){
                log.error("Appointment histories not found for pet id "+petId);
                throw new ResourceNotFoundException("Appointment histories not found");
            }
            List<AppointmentHistoryDto> appointmentHistoryDtos = appointmentHistories.stream().map(a -> modelMapper.map(a, AppointmentHistoryDto.class)).collect(Collectors.toList());
            return appointmentHistoryDtos;
        }else{
            log.error("Pet not found with pet id "+petId);
            throw new ResourceNotFoundException("Pet not found with pet Id: "+petId);
        }

    }

    @Override
    public List<AppointmentHistoryDto> getAppointmentHistoryDtoByDoctorId(long doctorId) {
        log.info("Getting appointment history dto for doctor of doctor id "+doctorId);
        if(appointmentServices.isDoctorExist(doctorId)){
            List<AppointmentHistory> appointmentHistories = appointmentHistoryRepository.getAppointmentHistoryByDoctorId(doctorId);
            if(appointmentHistories.isEmpty()){
                log.error("Appointment histories not found for doctor id "+doctorId);
                throw new ResourceNotFoundException("Appointment histories not found");
            }
            List<AppointmentHistoryDto> appointmentHistoryDtos = appointmentHistories.stream().map(a -> modelMapper.map(a, AppointmentHistoryDto.class)).collect(Collectors.toList());
            return appointmentHistoryDtos;
        }else{
            log.error("Doctor not found with doctor id "+doctorId);
            throw new ResourceNotFoundException("Doctor not found with doctor Id: "+doctorId);
        }
    }

    @Override
    public boolean isAppointmentHistoryExistForPetId(long petId) {
        log.info("Checking if appointment histories exist for pet with pet id "+petId);
        List<AppointmentHistory> appointmentHistories = appointmentHistoryRepository.findAll();
        if(appointmentHistories.isEmpty()){
            log.error("Appointment histories not found for doctor id "+petId);
            throw new ResourceNotFoundException("Appointment histories not found");
        }
        for(AppointmentHistory appointmentHistory : appointmentHistories ){
            if(appointmentHistory.getPetId() == petId){
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean isAppointmentHistoryExistForDoctorId(long doctorId) {
        log.info("Checking if appointment histories exists for doctor with doctor id "+doctorId);
        List<AppointmentHistory> appointmentHistories = appointmentHistoryRepository.findAll();
        if(appointmentHistories.isEmpty()){
            log.error("Appointment histories not found for doctor id "+doctorId);
            throw new ResourceNotFoundException("Appointment histories not found");
        }
        for(AppointmentHistory appointmentHistory : appointmentHistories){
            if(appointmentHistory.getDoctorId() == doctorId){
                return true;
            }
        }
        return false;
    }
}
