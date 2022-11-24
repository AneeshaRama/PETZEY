package com.pratian.AppointmentService.Service;

import com.pratian.AppointmentService.Dto.SymptomDto;
import com.pratian.AppointmentService.Entities.Symptom;

import java.util.List;


public interface SymptomServices {

    SymptomDto addSymptom(SymptomDto symptomDto, long petId);

    SymptomDto getSymptomById(long symptomId);

    List<SymptomDto> getSymptomsByPetId(long petId);

    SymptomDto editSymptom(SymptomDto symptomDto, long symptomId);

    void deleteSymptom(long symptomId);

    boolean isSymptomsExists(long petId);
}
