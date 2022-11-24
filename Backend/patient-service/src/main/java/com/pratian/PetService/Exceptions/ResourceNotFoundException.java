package com.pratian.PetService.Exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResourceNotFoundException extends RuntimeException{
    private String message;
}
