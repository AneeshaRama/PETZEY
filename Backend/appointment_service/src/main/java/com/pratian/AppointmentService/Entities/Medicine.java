package com.pratian.AppointmentService.Entities;

import com.pratian.AppointmentService.Enums.ConsumptionTime;
import com.pratian.AppointmentService.Enums.Duration;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long medicineId;

    private String medicineName;

    private int days;

    private String description;

    @Enumerated(EnumType.STRING)
    private ConsumptionTime consumptionTime;

    @Enumerated(EnumType.STRING)
    private Duration duration;
}
