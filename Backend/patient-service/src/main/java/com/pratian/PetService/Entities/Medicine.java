package com.pratian.PetService.Entities;

import com.pratian.PetService.Enums.ConsumptionTime;
import com.pratian.PetService.Enums.Duration;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Medicine {
    private long medicineId;

    private String medicineName;

    private int days;

    private String description;

    private ConsumptionTime consumptionTime;

    private Duration duration;
}
