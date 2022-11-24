package com.pratian.SettingsService.Service;

import com.pratian.SettingsService.Dto.ReceptionistDto;
import com.pratian.SettingsService.Entities.Receptionist;

public interface ReceptionistServices {

    ReceptionistDto addReceptionistProfile(Receptionist receptionist);

    ReceptionistDto getReceptionistProfile(long receptionistId);

    ReceptionistDto getReceptionistProfileByUsername(String username);

    ReceptionistDto editReceptionistProfile(ReceptionistDto receptionistDto, long receptionistId);

    void deleteReceptionistProfile(long receptionistId);
}
