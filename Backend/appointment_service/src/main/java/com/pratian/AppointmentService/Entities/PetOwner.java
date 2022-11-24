package com.pratian.AppointmentService.Entities;

import com.pratian.AppointmentService.Enums.Prefix;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PetOwner {
    private long ownerId;

    private String ownerName;

    private String phone;

    private String email;

    private String address;

    private Prefix prefix;
}
