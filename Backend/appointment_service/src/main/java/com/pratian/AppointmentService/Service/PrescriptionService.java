package com.pratian.AppointmentService.Service;

import com.pratian.AppointmentService.Dto.PrescriptionDto;
import com.pratian.AppointmentService.Entities.Prescription;

import java.util.List;

public interface PrescriptionService {

    PrescriptionDto addPrescription(PrescriptionDto prescriptionDto, long appointmentId);

    Prescription getPrescriptionById(long prescriptionId);

    Prescription getPrescriptionByAppointment(long appointmentId);

    List<Prescription> getAllPrescriptions();

    PrescriptionDto editPrescription(PrescriptionDto prescriptionDto, long prescriptionId);

    void deletePrescription(long appointmentId, long prescriptionId);

    List<Prescription> getPrescriptionHistoriesByPetId(long petId);

    boolean isPrescriptionHistoriesByPetId(long petId);

    boolean isPrescriptionHistoryExistsByDate(long petId,String date);

    PrescriptionDto getPrescriptionByDate(long petId, String date);

}
