package com.pratian.AppointmentService.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Vital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long vitalId;

    private int heartBpm;

    private int lungsBpm;

    private int temperature;
}
