package com.pratian.auth.Services;

import com.pratian.auth.Entities.AppUser;
import com.pratian.auth.Entities.Doctor;
import com.pratian.auth.Entities.PetOwner;
import com.pratian.auth.Entities.Receptionist;

public interface AppUserServices {

    AppUser registerPetOwner(PetOwner petOwner);

    AppUser registerDoctor(Doctor doctor);

    AppUser registerReceptionist(Receptionist receptionist);

}
