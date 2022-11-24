package com.pratian.auth.Exceptions;

import com.pratian.auth.Utils.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ApiResponse> customExceptionHandler(CustomException e){
        String message = e.getMessage();
        ApiResponse response = new ApiResponse(message, false);
        return new ResponseEntity<ApiResponse>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AuthenticationFailedException.class)
    public ResponseEntity<ApiResponse> authenticationFailedExceptionHandler(AuthenticationFailedException e){
        String message = e.getMessage();
        ApiResponse response = new ApiResponse(message, false);
        return new ResponseEntity<ApiResponse>(response, HttpStatus.UNAUTHORIZED);
    }

}
