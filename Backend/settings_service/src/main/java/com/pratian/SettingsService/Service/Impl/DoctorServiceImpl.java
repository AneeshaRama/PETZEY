package com.pratian.SettingsService.Service.Impl;

import com.pratian.SettingsService.Dto.DoctorAppointmentDto;
import com.pratian.SettingsService.Dto.DoctorDto;
import com.pratian.SettingsService.Dto.DoctorRecommendationDto;
import com.pratian.SettingsService.Entities.Doctor;
import com.pratian.SettingsService.Exception.ResourceAlreadyExistsException;
import com.pratian.SettingsService.Exception.ResourceNotFoundException;
import com.pratian.SettingsService.Repository.DoctorRepository;
import com.pratian.SettingsService.Service.DoctorServices;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorServices {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ModelMapper modelMapper;

    @Value(value = "${rest.appointmentService}")
    String appointmentServiceUrl;

    private static final Logger log = LoggerFactory.getLogger(DoctorServiceImpl.class);

    @Override
    public DoctorDto addDoctorProfile(Doctor doctor) {
        log.info("Adding new doctor profile");
        if(doctorRepository.existsById(doctor.getDoctorId())){
            throw new ResourceAlreadyExistsException("Doctor already exists with doctor Id: "+ doctor.getDoctorId());
        }
        log.info("Saving doctor profile in the database");
        Doctor newDoctor = doctorRepository.save(doctor);
        DoctorDto doctorDto = modelMapper.map(newDoctor, DoctorDto.class);
        return doctorDto;

    }

    @Override
    public DoctorDto getDoctorProfile(long doctorId) {
        log.info("Getting the doctor details by doctor id "+ doctorId);
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(()-> new ResourceNotFoundException("Doctor not found with doctor Id: " + doctorId));
        DoctorDto doctorDto = modelMapper.map(doctor, DoctorDto.class);
        return doctorDto;
    }

    @Override
    public DoctorDto getDoctorByUsername(String username) {
        log.info("Getting the doctor profiles by username");
        Doctor doctor = doctorRepository.findByUsername(username);
        if(doctor == null){
            log.error("Doctor not found with username "+ username);
            throw new ResourceNotFoundException("Doctor not found with username "+ username);
        }
        return modelMapper.map(doctor, DoctorDto.class);
    }


    @Override
    public DoctorDto getDoctorProfileByAppointmentId(long appointmentId) {
        log.info("Getting the doctor profile by appointment id "+appointmentId);
        if(isAppointmentExist(appointmentId)){
            DoctorAppointmentDto appointment = restTemplate.getForObject(appointmentServiceUrl+"/appointments/appointment/"+appointmentId+"/get-doctor-appointment-dto", DoctorAppointmentDto.class);
            Doctor doctor = doctorRepository.findById(appointment.getDoctorId()).get();
            DoctorDto doctorDto = modelMapper.map(doctor, DoctorDto.class);
            return doctorDto;
        }else{
            log.error("Appointment not found with appointment id "+ appointmentId);
            throw new ResourceNotFoundException("Appointment not found with appointment Id: "+appointmentId);
        }
    }

    @Override
    public List<DoctorDto> getAllDoctorProfiles() {
        log.info("Searching all doctor profiles");
        List<Doctor> doctors = doctorRepository.findAll();
//        if(doctors.isEmpty()){
//            log.error("Doctors not found");
//            throw new ResourceNotFoundException("No doctors found");
//        }
        List<DoctorDto> doctorDtos = doctors.stream().map(d -> modelMapper.map(d, DoctorDto.class)).collect(Collectors.toList());
        return doctorDtos;
    }

    @Override
    public List<DoctorDto> searchDoctorProfiles(String name) {
        log.info("Searching doctor profiles with name "+ name);
        List<Doctor> doctors = doctorRepository.searchDoctorProfiles(name);
//        if(doctors.isEmpty()){
//            log.error("Doctors not found");
//            throw new ResourceNotFoundException("Doctor profile not found");
//        }
        List<DoctorDto> doctorDtos = doctors.stream().map(d -> modelMapper.map(d, DoctorDto.class)).collect(Collectors.toList());
        return doctorDtos;
    }

    @Override
    public List<DoctorRecommendationDto> getDoctorsBySpeciality(String speciality) {
        log.info("Getting profile of doctors of speaciality: "+speciality);
        List<Doctor> doctors = doctorRepository.getDoctorBySpeciality(speciality);
        if(doctors.isEmpty()){
            log.error("Doctors not found");
            throw new ResourceNotFoundException("Doctor profile not found");
        }
        List<DoctorRecommendationDto> doctorDtos = doctors.stream().map(d -> modelMapper.map(d, DoctorRecommendationDto.class)).collect(Collectors.toList());
        return doctorDtos;
    }

    @Override
    public DoctorDto editDoctorProfile(DoctorDto doctorDto, long doctorId) {
        log.info("Updating doctor profile");
        Doctor existingDoctor = doctorRepository.findById(doctorId).orElseThrow(()-> new ResourceNotFoundException("Doctor not found with doctor Id: " + doctorId));
        existingDoctor.setDoctorName(doctorDto.getDoctorName());
        existingDoctor.setUsername(doctorDto.getUsername());
        existingDoctor.setEmail(doctorDto.getEmail());
        existingDoctor.setSpeciality(doctorDto.getSpeciality());
        existingDoctor.setPhoneNumber(doctorDto.getPhoneNumber());
        existingDoctor.setNpiNumber(doctorDto.getNpiNumber());
        existingDoctor.setAddress(doctorDto.getAddress());
        existingDoctor.setProfilePicture(doctorDto.getProfilePicture());
            log.info("Saving updated profile...");
        doctorRepository.save(existingDoctor);
        DoctorDto updatedDoctorDto = modelMapper.map(existingDoctor, DoctorDto.class);
        return updatedDoctorDto;
    }

    @Override
    public void deleteDoctorProfile(long doctorId) {
        log.info("Deleting doctor profile");
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(()-> new ResourceNotFoundException("Doctor not found with doctor Id: " + doctorId));
        doctorRepository.deleteById(doctorId);
    }

    @Override
    public boolean isDoctorExists(long doctorId) {
        log.info("Checking if doctor exists by doctor id "+ doctorId);
        if(doctorRepository.existsById(doctorId)){
            return true;
        }
        return false;
    }

    @Override
    public boolean isAppointmentExist(long appointmentId) {
        log.info("Checking if appointment exists with appointment id "+ appointmentId);
        ResponseEntity<Boolean> response = restTemplate.getForEntity(appointmentServiceUrl+"/appointments/exists/appointment/"+appointmentId, Boolean.class);

        if(response.getBody()){
            return true;
        }
        return false;
    }
}
