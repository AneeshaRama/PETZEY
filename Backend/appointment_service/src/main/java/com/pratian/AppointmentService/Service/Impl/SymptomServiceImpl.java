package com.pratian.AppointmentService.Service.Impl;

import com.pratian.AppointmentService.Dto.SymptomDto;
import com.pratian.AppointmentService.Entities.Symptom;
import com.pratian.AppointmentService.Exceptions.ResourceAlreadyExistsException;
import com.pratian.AppointmentService.Exceptions.ResourceNotFoundException;
import com.pratian.AppointmentService.Repository.SymptomRepository;
import com.pratian.AppointmentService.Service.AppointmentServices;
import com.pratian.AppointmentService.Service.SymptomServices;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SymptomServiceImpl implements SymptomServices {

    @Autowired
    private SymptomRepository symptomRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AppointmentServices appointmentServices;

    private static final Logger log = LoggerFactory.getLogger(SymptomServiceImpl.class);


    @Override
    public SymptomDto addSymptom(SymptomDto symptomDto, long petId) {
        log.info("Adding symptoms for pet id "+petId);
        if(appointmentServices.isPetExist(petId)){
            if(symptomRepository.existsById(symptomDto.getSymptomId())){
                log.error("Symptom already exist with symptom id "+symptomDto.getSymptomId());
                throw new ResourceAlreadyExistsException("Symptom already exists");
            }
            Symptom newSymptom = modelMapper.map(symptomDto, Symptom.class);
            newSymptom.setPetId(petId);
            symptomRepository.save(newSymptom);
            SymptomDto newSymptomDto = modelMapper.map(newSymptom, SymptomDto.class);
            return newSymptomDto;
        }else{
            log.error("Pet not found with pet id "+petId);
            throw new ResourceNotFoundException("Pet not found with pet Id: "+ petId);
        }

    }

    @Override
    public SymptomDto getSymptomById(long symptomId) {
        log.info("Get symptom details with symptom id "+symptomId);
        Symptom symptom = symptomRepository.findById(symptomId).orElseThrow(()-> new ResourceNotFoundException("Symptom not found with symptom Id: "+symptomId));
        SymptomDto symptomDto = modelMapper.map(symptom, SymptomDto.class);
        return symptomDto;
    }

    @Override
    public List<SymptomDto> getSymptomsByPetId(long petId) {
        log.info("Get all symptoms of pet id "+petId);
        List<Symptom> symptoms = symptomRepository.getSymptomsByPets(petId);
        if(symptoms.isEmpty()){
            log.error("Symptoms not found for pet id "+petId);
            throw new ResourceNotFoundException("Symptoms not found");
        }
        List<SymptomDto> symptomDtos = symptoms.stream().map(s -> modelMapper.map(s, SymptomDto.class)).collect(Collectors.toList());
        return symptomDtos;
    }

    @Override
    public SymptomDto editSymptom(SymptomDto symptomDto, long symptomId) {
        log.info("Updating symptom details with symptom id "+symptomId);
        Symptom existingSymptom = symptomRepository.findById(symptomId).orElseThrow(()-> new ResourceNotFoundException("Symptom not found with symptom Id: "+symptomId));
        existingSymptom.setDescription(symptomDto.getDescription());
        SymptomDto updatedDto = modelMapper.map(existingSymptom, SymptomDto.class);
        return updatedDto;
    }

    @Override
    public void deleteSymptom(long symptomId) {
        log.info("Deleting symptom with symptom id "+symptomId);
        Symptom symptom = symptomRepository.findById(symptomId).orElseThrow(()-> new ResourceNotFoundException("Symptom not found with symptom Id: "+symptomId));
        symptomRepository.deleteById(symptom.getSymptomId());
    }

    @Override
    public boolean isSymptomsExists(long petId) {
        log.info("Checking if symptoms exists for pet of pet id "+petId);
        List<Symptom> symptoms = symptomRepository.getSymptomsByPets(petId);
        return !symptoms.isEmpty();
    }
}
