package com.pratian.PetService.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Prescription {

    private long prescriptionId;

    private String prescriptionDate;

    private List<Medicine> medicines = new ArrayList<>();
}
