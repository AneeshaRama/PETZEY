package com.pratian.AppointmentService.Service.Impl;

import com.pratian.AppointmentService.Entities.Medicine;
import com.pratian.AppointmentService.Entities.Prescription;
import com.pratian.AppointmentService.Exceptions.ResourceAlreadyExistsException;
import com.pratian.AppointmentService.Exceptions.ResourceNotFoundException;
import com.pratian.AppointmentService.Repository.MedicineRepository;
import com.pratian.AppointmentService.Repository.PrescriptionRepository;
import com.pratian.AppointmentService.Service.MedicineService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    private static final Logger log = LoggerFactory.getLogger(MedicineServiceImpl.class);

    @Override
    public Medicine addMedicine(Medicine medicine, long prescriptionId) {
        log.info("Adding new medicine for prescription id "+prescriptionId);
        Prescription prescription = prescriptionRepository.findById(prescriptionId).orElseThrow(()-> new ResourceNotFoundException("Prescription not found with prescription Id :"+prescriptionId));
        if(medicineRepository.existsById(medicine.getMedicineId())){
            log.error("Medicine already exists with medicine id "+medicine.getMedicineId());
            throw new ResourceAlreadyExistsException("Medicine already exists");
        }
        Medicine newMedicine = medicineRepository.save(medicine);
        prescription.getMedicines().add(newMedicine);
        prescriptionRepository.save(prescription);
        return newMedicine;
    }

    @Override
    public List<Medicine> getAllMedicines(long prescriptionId) {
        log.info("Getting all medicines of presceription id "+prescriptionId);
        Prescription prescription = prescriptionRepository.findById(prescriptionId).orElseThrow(()-> new ResourceNotFoundException("Prescription not found with prescription Id :"+prescriptionId));
        List<Medicine> medicines = prescription.getMedicines();
        if(medicines.isEmpty()){
            log.error("Medicines not found for prescription id "+prescriptionId);
            throw new ResourceNotFoundException("Medicines not found");
        }
        return medicines;
    }

    @Override
    public Medicine getMedicineDetailsById(long medicineId) {
        log.info("Getting medicine details with medicine id "+medicineId);
        Medicine medicine = medicineRepository.findById(medicineId).orElseThrow(()-> new ResourceNotFoundException("Medicine not found with medicine Id: "+medicineId));
        return medicine;
    }

    @Override
    public Medicine editMedicine(Medicine medicine, long medicineId) {
        log.info("Updating medicine details with medicine id "+medicineId);
        Medicine existingMedicine = medicineRepository.findById(medicineId).orElseThrow(()-> new ResourceNotFoundException("Medicine not found with medicine Id: "+medicineId));
        existingMedicine.setMedicineName(medicine.getMedicineName());
        existingMedicine.setDays(medicine.getDays());
        existingMedicine.setConsumptionTime(medicine.getConsumptionTime());
        existingMedicine.setDuration(medicine.getDuration());
        existingMedicine.setDescription(medicine.getDescription());
        return medicineRepository.save(existingMedicine);

    }

    @Override
    public void deleteMedicine(long prescriptionId, long medicineId) {
        log.info("Deleting medicine of prescription id "+prescriptionId);
        Prescription prescription = prescriptionRepository.findById(prescriptionId).orElseThrow(()-> new ResourceNotFoundException("Prescription not found with prescription Id :"+prescriptionId));

        log.error("Medicine not found medicine id "+medicineId);
        Medicine medicine = medicineRepository.findById(medicineId).orElseThrow(()-> new ResourceNotFoundException("Medicine not found with medicine Id: "+medicineId));
        prescription.getMedicines().remove(medicine);
        prescriptionRepository.save(prescription);
        medicineRepository.deleteById(medicineId);

    }
}
