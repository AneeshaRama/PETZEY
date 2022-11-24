package com.pratian.auth.Services.Impl;

import com.pratian.auth.Dtos.DoctorDto;
import com.pratian.auth.Dtos.ReceptionistDto;
import com.pratian.auth.Entities.AppUser;
import com.pratian.auth.Entities.Doctor;
import com.pratian.auth.Entities.PetOwner;
import com.pratian.auth.Entities.Receptionist;
import com.pratian.auth.Exceptions.CustomException;
import com.pratian.auth.Dtos.PetOwnerDto;
import com.pratian.auth.Repositories.AppUserRepository;
import com.pratian.auth.Services.AppUserServices;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;



@Service
public class AppUserServiceImpl implements AppUserServices {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value(value = "${rest.settingServiceUrl}")
    String settingServiceUrl;

    private static final Logger log = LoggerFactory.getLogger(AppUserServiceImpl.class);

    @Override
    public AppUser registerPetOwner(PetOwner petOwner) {
        AppUser user = appUserRepository.findByUsername(petOwner.getUsername());
        String encodedPassword = passwordEncoder.encode(petOwner.getUserPassword());
        petOwner.setUserPassword(encodedPassword);
        if(user == null){
            log.info("Saving the new user in the database");
            PetOwnerDto petOwnerDto = modelMapper.map(petOwner, PetOwnerDto.class);
            restTemplate.postForObject(settingServiceUrl+"/owners/create/owner/new/profile", petOwnerDto, PetOwnerDto.class);
            AppUser newOwner = modelMapper.map(petOwner, AppUser.class);
            return appUserRepository.save(newOwner);
        }
        log.error("User already exists with username "+petOwner.getUsername());
        throw new CustomException("Username "+petOwner.getUsername()+ " is already in use.Please try with other username");
    }

    @Override
    public AppUser registerDoctor(Doctor doctor) {
        AppUser user = appUserRepository.findByUsername(doctor.getUsername());
        String encodedPassword = passwordEncoder.encode(doctor.getUserPassword());
        doctor.setUserPassword(encodedPassword);
        if (user == null){
            log.info("Saving the new user in the database");
            DoctorDto doctorDto = modelMapper.map(doctor, DoctorDto.class);

            restTemplate.postForObject(settingServiceUrl+"/doctors/create/new/profile", doctorDto, DoctorDto.class);
            AppUser newDoctor = modelMapper.map(doctor, AppUser.class);
            return appUserRepository.save(newDoctor);
        }
        log.error("User already exists with username "+doctor.getUsername());
        throw new CustomException("Username "+doctor.getUsername()+ " is already in use.Please try with other username");
    }

    @Override
    public AppUser registerReceptionist(Receptionist receptionist) {

        AppUser user = appUserRepository.findByUsername(receptionist.getUsername());
        String encodedPassword = passwordEncoder.encode(receptionist.getUserPassword());
        receptionist.setUserPassword(encodedPassword);
        if(user == null){
            log.info("Saving the new user in the database");
            ReceptionistDto receptionistDto = modelMapper.map(receptionist, ReceptionistDto.class);

            restTemplate.postForObject(settingServiceUrl+"/receptionists/create/receptionist/new/profile", receptionistDto, ReceptionistDto.class);
            AppUser newReceptionist = modelMapper.map(receptionist, AppUser.class);
            return appUserRepository.save(newReceptionist);

        }
        log.error("User already exists with username "+receptionist.getUsername());
        throw new CustomException("Username "+receptionist.getUsername()+ " is already in use.Please try with other username");
    }
}
