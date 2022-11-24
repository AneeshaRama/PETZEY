package com.pratian.SettingsService.Service.Impl;

import com.pratian.SettingsService.Dto.ClinicDto;
import com.pratian.SettingsService.Entities.Clinic;
import com.pratian.SettingsService.Entities.PetOwner;
import com.pratian.SettingsService.Exception.ResourceAlreadyExistsException;
import com.pratian.SettingsService.Exception.ResourceNotFoundException;
import com.pratian.SettingsService.Repository.ClinicRepository;
import com.pratian.SettingsService.Repository.PetOwnerRepository;
import com.pratian.SettingsService.Service.ClinicServices;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClinicServiceImpl implements ClinicServices {

    @Autowired
    private ClinicRepository clinicRepository;

    @Autowired
    private PetOwnerRepository petOwnerRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ModelMapper modelMapper;

    private static final Logger log = LoggerFactory.getLogger(ClinicServiceImpl.class);

    @Override
    public Clinic addClinic(Clinic clinic) {
        log.info("Saving new clinic details in the database");
        if(clinicRepository.existsById(clinic.getClinicId())){
            throw new ResourceAlreadyExistsException("Clinic already exists with clinic Id: " + clinic.getClinicId());
        }
        Clinic newClinic = clinicRepository.save(clinic);
        return newClinic;
    }

    @Override
    public Clinic getClinic(long clinicId) {
        log.info("Getting the clinic details of clinic id "+ clinicId);
        Clinic clinic = clinicRepository.findById(clinicId).orElseThrow(()-> new ResourceNotFoundException("Clinic not found with clinic Id: " + clinicId ));
        return clinic;
    }

    @Override
    public Clinic editClinic(Clinic clinic, long clinicId) {
        log.info("Updating the clinic details");
        Clinic existingClinic = clinicRepository.findById(clinicId).orElseThrow(()-> new ResourceNotFoundException("Clinic not found with clinic Id: " + clinicId ));
        existingClinic.setClinicName(clinic.getClinicName());
        existingClinic.setClinicAddress(clinic.getClinicAddress());
        log.info("Saving updated clinic details in database ");
        clinicRepository.save(existingClinic);
        return existingClinic;
    }

    @Override
    public void deleteClinic(long clinicId) {
        log.info("Deleting the clinic details");
        Clinic clinic = clinicRepository.findById(clinicId).orElseThrow(()-> new ResourceNotFoundException("Clinic not found with clinic Id: " + clinicId ));
        clinicRepository.deleteById(clinic.getClinicId());
    }

    @Override
    public List<ClinicDto> getClinicRecommendation(String address) {
        log.info("Getting clinic recommendation");
        List<PetOwner> owners = petOwnerRepository.getPetOwnersByAddress(address);
        if(owners.isEmpty()){
            log.error("Owners not found of address: "+address);
            throw new ResourceNotFoundException("Owners not found");
        }
        List<Clinic> clinics = clinicRepository.getClinicByAddress(address);
        if(clinics.isEmpty()){
            log.error("Clinics not found of address: "+address);
            throw new ResourceNotFoundException("Clinics not found");
        }

        List<ClinicDto> clinicDtos = clinics.stream().map(c -> modelMapper.map(c, ClinicDto.class)).collect(Collectors.toList());
        return clinicDtos;
    }

    @Override
    public boolean isClinicRecommendationExists(String address) {
        log.info("Checking if clinic recommendations exists fro address: "+address);
        List<Clinic> clinics = clinicRepository.getClinicByAddress(address);
        return !clinics.isEmpty();
    }
}
