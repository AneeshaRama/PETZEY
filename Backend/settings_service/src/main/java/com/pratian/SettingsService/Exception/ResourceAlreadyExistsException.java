package com.pratian.SettingsService.Exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResourceAlreadyExistsException extends RuntimeException{

    private String message;

}
