package com.pratian.PetService.Services;

import com.pratian.PetService.Entities.*;

import java.util.List;

public interface PetServices {

    List<Pet> getAllPetProfile();

    Pet getPetProfile(long petId);

    List<Pet> searchPetProfile(String name);

    boolean isPetExist(long petId);

    List<AppointmentHistory> getAppointmentHistoriesByPetId(long petId);

    boolean isAppointmentHistoryExistForPet(long petId);

    List<Pet> viewRecentlyConsultedPets(String date);

    List<Symptoms> getSymptomsHistory(long petId);

    List<Prescription> getPrescriptionHistories(long petId);

    Prescription getPrescriptionHistoryByDate(long petId, String date);

    boolean isAppointmentExistByDate(String date);

    boolean isPetExistsByName(String name);

    boolean isSymptomExists(long petId);

    boolean isPrescriptionHistoriesExist(long petId);

    boolean isAppointmentsExistsByPetId(long petId);

    boolean isPrescriptionExistsByDate(long petId,String date);
}
