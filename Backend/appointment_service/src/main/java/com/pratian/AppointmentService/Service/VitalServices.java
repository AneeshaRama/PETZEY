package com.pratian.AppointmentService.Service;

import com.pratian.AppointmentService.Entities.Vital;

public interface VitalServices {

    Vital addVital(Vital vital, long appointmentId);

    Vital getVitalDetails(long vitalId);

    Vital getVitalByAppointment(long appointmentId);

    Vital editVital(Vital vital, long vitalId);

    void deleteVital(long appointmentId, long vitalId);
}
