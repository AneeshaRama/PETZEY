package com.pratian.SettingsService.Service.Impl;

import com.pratian.SettingsService.Dto.ReceptionistDto;
import com.pratian.SettingsService.Entities.Receptionist;
import com.pratian.SettingsService.Exception.ResourceAlreadyExistsException;
import com.pratian.SettingsService.Exception.ResourceNotFoundException;
import com.pratian.SettingsService.Repository.ReceptionistRepository;
import com.pratian.SettingsService.Service.ReceptionistServices;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReceptionistServiceImpl implements ReceptionistServices {

    @Autowired
    private ReceptionistRepository receptionistRepository;

    @Autowired
    private ModelMapper modelMapper;

    private static final Logger log = LoggerFactory.getLogger(ReceptionistServiceImpl.class);

    @Override
    public ReceptionistDto addReceptionistProfile(Receptionist receptionist) {
        log.info("Saving new receptionist profile in the database");
        if(receptionistRepository.existsById(receptionist.getReceptionistId())){
            log.error("Receptionist already exists with receptionist id "+ receptionist.getReceptionistId());
            throw new ResourceAlreadyExistsException("Receptionist already exists with receptionist Id: " + receptionist.getReceptionistId());
        }
        Receptionist newReceptionist = receptionistRepository.save(receptionist);
        ReceptionistDto receptionistDto = modelMapper.map(newReceptionist, ReceptionistDto.class);
        return receptionistDto;
    }

    @Override
    public ReceptionistDto getReceptionistProfile(long receptionistId) {
        log.info("Getting the receptionist profile of receptionist id "+ receptionistId);
        Receptionist receptionist = receptionistRepository.findById(receptionistId).orElseThrow(()-> new ResourceNotFoundException("Receptionist not found with receptionist Id: " + receptionistId));
        ReceptionistDto receptionistDto = modelMapper.map(receptionist, ReceptionistDto.class);
        return receptionistDto;
    }

    @Override
    public ReceptionistDto getReceptionistProfileByUsername(String username) {
        log.info("Getting the receptionist profile of username "+username);
        Receptionist receptionist = receptionistRepository.findByUsername(username);
        if(receptionist == null){
            log.error("Receptionist not found with username: "+username);
            throw new ResourceAlreadyExistsException("Receptionist not found with username "+ username);
        }
        return modelMapper.map(receptionist, ReceptionistDto.class);
    }

    @Override
    public ReceptionistDto editReceptionistProfile(ReceptionistDto receptionistDto, long receptionistId) {
        log.info("Updating the receptionist profile of receptionist of receptionist id "+ receptionistId);
        Receptionist existingReceptionist = receptionistRepository.findById(receptionistId).orElseThrow(()-> new ResourceNotFoundException("Receptionist not found with receptionist Id: " + receptionistId));
        existingReceptionist.setReceptionistName(receptionistDto.getReceptionistName());
        existingReceptionist.setPhone(receptionistDto.getPhone());
        existingReceptionist.setAddress(receptionistDto.getAddress());
        existingReceptionist.setProfilePicture(receptionistDto.getProfilePicture());
        existingReceptionist.setPrefix(receptionistDto.getPrefix());
        log.info("saving updated receptionist profile in the database");
        receptionistRepository.save(existingReceptionist);

        ReceptionistDto updatedDto = modelMapper.map(existingReceptionist, ReceptionistDto.class);
        return updatedDto;
    }

    @Override
    public void deleteReceptionistProfile(long receptionistId) {
        log.info("Deleting the receptionist profile");
        Receptionist receptionist = receptionistRepository.findById(receptionistId).orElseThrow(()-> new ResourceNotFoundException("Receptionist not found with receptionist Id: " + receptionistId));
        receptionistRepository.deleteById(receptionistId);
    }
}
