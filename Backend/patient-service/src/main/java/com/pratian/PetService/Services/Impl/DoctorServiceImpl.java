package com.pratian.PetService.Services.Impl;

import com.pratian.PetService.Dtos.DoctorRecommendationDto;
import com.pratian.PetService.Entities.AppointmentHistory;
import com.pratian.PetService.Entities.Doctor;
import com.pratian.PetService.Exceptions.ResourceNotFoundException;
import com.pratian.PetService.Services.DoctorServices;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorServices {


    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ModelMapper modelMapper;

    @Value(value = "${rest.settingService}")
    String settingServiceUrl;

    @Value(value = "${rest.appointmentService}")
    String appointmentServiceUrl;

    private static final Logger log = LoggerFactory.getLogger(DoctorServiceImpl.class);

    @Override
    public Doctor getDoctorProfile(long doctorId) {
        log.info("Getting doctor profile of doctor id "+ doctorId);
        if(isDoctorExist(doctorId)){
            Doctor doctor = restTemplate.getForObject(settingServiceUrl+"/doctors/doctor/"+doctorId+"/profile", Doctor.class);
            return doctor;
        }else{
            throw new ResourceNotFoundException("Doctor not found with doctor Id: "+doctorId);
        }
    }

    @Override
    public List<AppointmentHistory> getAppointmentHistoryFromDoctorId(long doctorId) {
        log.info("Getting all appointment histories for doctor of doctor id "+doctorId);
        if(isDoctorExist(doctorId)){
            if(isAppointmentHistoryExistForDoctor(doctorId)){
                List<AppointmentHistory> appointmentHistories = restTemplate.getForObject(appointmentServiceUrl+"/appointment-history/doctor/"+doctorId+"/appointment-history", List.class);
                if(appointmentHistories.isEmpty()){
                    throw new ResourceNotFoundException("Appointment histories not found");
                }
                return appointmentHistories;
            }else{
                log.error("Appointment histories not found for doctor id "+doctorId);
                throw new ResourceNotFoundException("Appointment history not found for this doctor");
            }

        }else{
            log.error("Doctor not found with doctor id "+doctorId);
            throw new ResourceNotFoundException("Doctor not found with doctor Id: "+doctorId);
        }
    }

    @Override
    public List<Doctor> searchDoctorProfile(String name) {
        log.info("Searching for all doctor profiles with name "+name);
        List<Doctor> doctors = restTemplate.getForObject(settingServiceUrl+"/doctors/doctor/"+name+"/profiles", List.class);
        if(doctors.isEmpty()){
            throw new ResourceNotFoundException("Doctors not found");
        }
        return doctors;
    }

    @Override
    public List<DoctorRecommendationDto> getDoctorRecommendation(long appointmentId) {
        log.info("Getting doctor recommendation for appointment of appointment id "+appointmentId);
        if(isAppointmentExists(appointmentId)){
            List<Doctor> listOfDoctors= new ArrayList<>();
            DoctorRecommendationDto doctor = restTemplate.getForObject(appointmentServiceUrl+"/appointments/appointment/"+appointmentId+"/get-doctor-appointment-dto", DoctorRecommendationDto.class);
            Doctor existingDoctor = restTemplate.getForObject(settingServiceUrl+"/doctors/doctor/"+doctor.getDoctorId()+"/profile", Doctor.class);
            Doctor[] doctors = restTemplate.getForObject(settingServiceUrl+"/doctors/doctor/"+existingDoctor.getSpeciality()+"/get-all-profiles", Doctor[].class);
            for(Doctor doc : doctors){
                listOfDoctors.add(doc);
            }
            List<DoctorRecommendationDto> doctorRecommendationDtos = listOfDoctors.stream().map(d -> modelMapper.map(d, DoctorRecommendationDto.class )).collect(
                    Collectors.toList());
            return doctorRecommendationDtos;
        }else{
            log.error("Appointment not found with appointment id "+appointmentId);
            throw new ResourceNotFoundException("Appointment not found with appointment Id: "+appointmentId);
        }
    }

    @Override
    public boolean isDoctorExist(long doctorId) {
        log.info("Checking if doctor exists with doctor id "+doctorId);
        String url = settingServiceUrl + "/doctors/exists/doctor/" + doctorId;
        ResponseEntity<Boolean> response = restTemplate.getForEntity(url, Boolean.class);
        return Boolean.TRUE.equals(response.getBody());
    }


    @Override
    public boolean isAppointmentHistoryExistForDoctor(long doctorId) {
        log.info("Checking if appointment histories exists for doctor of doctor id "+doctorId);
        ResponseEntity<Boolean> response = restTemplate.getForEntity(appointmentServiceUrl+"/appointment-history/exist/doctor/"+doctorId, Boolean.class);
        return Boolean.TRUE.equals(response.getBody());
    }

    @Override
    public boolean isAppointmentExists(long appointmentId) {
        log.info("Checking if appointment exists of appointment id "+appointmentId);
        ResponseEntity<Boolean> response = restTemplate.getForEntity(appointmentServiceUrl+"/appointments/exists/appointment/"+appointmentId, Boolean.class);
        return Boolean.TRUE.equals(response.getBody());
    }
}
