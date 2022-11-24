package com.pratian.AppointmentService.Service;

import com.pratian.AppointmentService.Entities.Medicine;

import java.util.List;

public interface MedicineService {
    Medicine addMedicine(Medicine medicine, long prescriptionId);

    List<Medicine> getAllMedicines(long prescriptionId);

    Medicine getMedicineDetailsById(long medicineId);

    Medicine editMedicine(Medicine medicine, long medicineId);

    void deleteMedicine(long prescriptionId, long medicineId);
}
