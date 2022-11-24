package com.pratian.AppointmentService.Service.Impl;


import com.pratian.AppointmentService.Dto.*;
import com.pratian.AppointmentService.Entities.*;
import com.pratian.AppointmentService.Enums.AppointmentStatus;
import com.pratian.AppointmentService.Exceptions.ResourceAlreadyExistsException;
import com.pratian.AppointmentService.Exceptions.ResourceNotFoundException;
import com.pratian.AppointmentService.Repository.*;
import com.pratian.AppointmentService.Service.*;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentServices {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private VitalServices vitalServices;

    @Autowired
    private PrescriptionService prescriptionService;

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private TestServices testServices;

    @Autowired
    private FeedbackServices feedbackServices;

    @Autowired
    private CommentServices commentServices;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private RestTemplate restTemplate;

    @Value(value = "${rest.settingService}")
    String settingServiceUrl;

    private static final Logger log = LoggerFactory.getLogger(AppointmentServiceImpl.class);

    @Override
    public AppointmentDto addNewAppointment(AppointmentDto appointmentDto, long doctorId, long ownerId,  long petId) {
        log.info("Adding new appointment");
        List<Appointment> appointments = appointmentRepository.findAll();
        if(appointments.size() != 0){
            for(Appointment appointment: appointments){
                if(appointment.getAppointmentDate().equals(appointmentDto.getAppointmentDate())){
                    if(appointment.getAppointmentTime().equals(appointmentDto.getAppointmentTime())) {
                        log.error("Appointment already exist with this time slot");
                        throw new ResourceAlreadyExistsException(
                                "Appointment is already existed with this time slot...Please select different time slot");
                    }
                }
            }
        }
        Appointment newAppointment = modelMapper.map(appointmentDto, Appointment.class);
        if (isDoctorExist(doctorId)) {
            newAppointment.setDoctorId(doctorId);
        } else {
            log.error("Doctor not found with doctor id "+doctorId);
            throw new ResourceNotFoundException("Doctor not found with doctor Id: " + doctorId);
        }
        if (isPetExist(petId)) {
            newAppointment.setPetId(petId);
        } else {
            log.error("Pet not found with pet id "+petId);
            throw new ResourceNotFoundException("Pet not found with pet Id: " + petId);
        }
        newAppointment.setOwnerId(ownerId);
        appointmentRepository.save(newAppointment);
        AppointmentDto newAppointmentDto = modelMapper.map(newAppointment, AppointmentDto.class);
        return newAppointmentDto;
    }

    @Override
    public List<AppointDetailsDto> getAllAppointments() {
        log.info("Getting all appointments");
        List<Appointment> appointments = appointmentRepository.findAll();
        List<AppointDetailsDto> appointmentDtos = appointments.stream().map(a -> modelMapper.map(a, AppointDetailsDto.class)).collect(Collectors.toList());
        return appointmentDtos;
    }

    @Override
    public List<AppointDetailsDto> getAppointmentsByOwnerId(long ownerId) {
        List<Appointment> appointments = appointmentRepository.getAppointmentsByOwnerId(ownerId);
        List<AppointDetailsDto> appointDetailsDtos = appointments.stream().map(a -> modelMapper.map(a, AppointDetailsDto.class)).collect(Collectors.toList());
        return appointDetailsDtos;
    }

    @Override
    public Appointment getAppointmentDetails(long appointmentId) {
        log.info("Getting appointment details for appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+appointmentId));
        return appointment;
    }

    @Override
    public AppointmentDto editAppointmentDetails(AppointmentDto appointmentDto, long appointmentId) {
        log.info("Updating appointment details");
        Appointment existingAppointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        existingAppointment.setAppointmentDate(appointmentDto.getAppointmentDate());
        existingAppointment.setAppointmentTime(appointmentDto.getAppointmentTime());
        existingAppointment.setPetIssue(appointmentDto.getPetIssue());
        existingAppointment.setReasonToVisit(appointmentDto.getReasonToVisit());
        existingAppointment.setPatientName(appointmentDto.getPatientName());
        log.info("Saving updated appointment details");
        appointmentRepository.save(existingAppointment);
        AppointmentDto updatedDto = modelMapper.map(existingAppointment, AppointmentDto.class);
        return updatedDto;
    }

    @Override
    public void deleteAppointmentDetails(long appointmentId) {
        log.info("Deleting appointment details");
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        appointmentRepository.deleteById(appointment.getAppointmentId());
    }

    @Override
    public boolean isPetExist(long petId) {
        log.info("Checking if pet exists with pet id "+petId);
        String url = settingServiceUrl + "/pets/exists/pet/" + petId;
        ResponseEntity<Boolean> response = restTemplate.getForEntity(url, Boolean.class);
        return Boolean.TRUE.equals(response.getBody());
    }

    @Override
    public boolean isDoctorExist(long doctorId) {
        log.info("Checking if doctor exists with doctor id "+doctorId);
        String url = settingServiceUrl + "/doctors/exists/doctor/" + doctorId;
        ResponseEntity<Boolean> response = restTemplate.getForEntity(url, Boolean.class);
        return Boolean.TRUE.equals(response.getBody());
    }

    @Override
    public void closeAppointment(long appointmentId) {
        log.info("Closing the appointment of appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        appointment.setStatus(AppointmentStatus.CLOSED);
        appointmentRepository.save(appointment);
    }

    @Override
    public void cancelAppointment(long appointmentId) {
        log.info("Cancelling the appointment of appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    @Override
    public void confirmAppointment(long appointmentId) {
        log.info("Confirming the appointment of appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        appointment.setStatus(AppointmentStatus.CONFIRMED);
        appointmentRepository.save(appointment);
    }

    @Override
    public int getNumberOfAppointmentRequests() {
        log.info("Getting the total number of requested appointments");
        return appointmentRepository.getNumberOfAppointmentRequests();
    }

    @Override
    public int getNumberOfConfirmedAppointments() {
        log.info("Getting the total number of confirmed appointments");
        return appointmentRepository.getNumberOfConfirmedAppointments();
    }

    @Override
    public int getNumberOfCancelledAppointments() {
        log.info("Getting the total number of cancelled appointments");
        return appointmentRepository.getNumberOfCancelledAppointments();
    }

    @Override
    public int getNumberOfClosedAppointments() {
        log.info("Getting the total number of closed appointments");
        return appointmentRepository.getNumberOfClosedAppointments();
    }

    @Override
    public int getTotalNumberOfAppointments() {
        log.info("Getting total number of appointments");
        List<Appointment> appointments = appointmentRepository.findAll();
        return appointments.size();
    }

    @Override
    public List<AppointDetailsDto> getAppointmentsByStatus(AppointmentStatus status) {
        log.info("Getting all appointments with appointment status of "+ status);
        List<Appointment> appointments = appointmentRepository.getAppointmentsByStatus(status);
//        if(appointments.isEmpty()){
//            log.error("Appointments not found");
//            throw new ResourceNotFoundException("Appointments not found");
//        }
        List<AppointDetailsDto> appointmentDtos = appointments.stream().map(a->modelMapper.map(a, AppointDetailsDto.class)).collect(Collectors.toList());
        return appointmentDtos;
    }

    @Override
    public List<AppointDetailsDto> getAppointmentsByDoctor(long doctorId) {
        log.info("Getting all appointments by doctor id "+doctorId);
        List<Appointment> appointments = appointmentRepository.getAppointmentsByDoctor(doctorId);
        if(appointments.isEmpty()){
            log.error("Appointments not found for doctor of doctor id "+doctorId);
            throw new ResourceNotFoundException("Appointments not found");
        }
        List<AppointDetailsDto> appointmentDtos = appointments.stream().map(a->modelMapper.map(a, AppointDetailsDto.class)).collect(Collectors.toList());
        return appointmentDtos;
    }

    @Override
    public Appointment createAppointmentReport(long appointmentId) {
        log.info("Generating appointment report for appointment of appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        Appointment appointmentReport = appointmentRepository.findById(appointment.getAppointmentId()).get();
        return appointmentReport;
    }

    @Override
    public Appointment editAppointmentReport(Appointment appointment, long appointmentId) {
        log.info("Updating the appointment report for appointment of appointment id "+appointmentId);
        Appointment existingAppointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));

        vitalServices.editVital(appointment.getVital(), appointment.getVital().getVitalId());

        PrescriptionDto prescriptionDto = modelMapper.map(appointment.getPrescription(), PrescriptionDto.class);
        prescriptionService.editPrescription(prescriptionDto, prescriptionDto.getPrescriptionId());

        List<Medicine> medicines = appointment.getPrescription().getMedicines();
        for(Medicine medicine:medicines){
            medicineService.editMedicine(medicine, medicine.getMedicineId());
        }

        feedbackServices.editFeedback(appointment.getFeedback(), appointment.getFeedback().getFeedBackId());

        List<Test> tests = appointment.getTests();
        for(Test test : tests){
            testServices.editTest(test, test.getTestId());
        }

        commentServices.editComment(appointment.getComment(), appointment.getComment().getCommentId());

        return appointmentRepository.save(existingAppointment);
    }

    @Override
    public List<AppointmentDto> getAppointmentByDate(String date) {
        log.info("Getting appointment dto for date "+ date);
        List<Appointment> appointments = appointmentRepository.getAppointmentByDate(date);
        if(appointments.isEmpty()){
            log.error("Appointment not found on "+date);
            throw new ResourceNotFoundException("Appointments not found");
        }
        List<AppointmentDto> appointmentDtos = appointments.stream().map(a->modelMapper.map(a,AppointmentDto.class)).collect(Collectors.toList());
        return appointmentDtos;
    }

    @Override
    public List<GetByDateAppointmentDto> getAppointmentDetailsByDate(String date) {
        log.info("Getting appointment details for appointment booked on "+ date);
        List<Appointment> appointments = appointmentRepository.getAppointmentByDate(date);
        if(appointments.isEmpty()){
            log.error("Appointments not found on "+date);
            throw new ResourceNotFoundException("Appointments not found");
        }
        List<GetByDateAppointmentDto> appointmentDtos = appointments.stream().map(a->modelMapper.map(a,GetByDateAppointmentDto.class)).collect(Collectors.toList());
        return appointmentDtos;
    }

    @Override
    public boolean isAppointmentByDateExist(String date) {
        log.info("Checking if appointment exist on "+date);
        List<Appointment> appointments = appointmentRepository.getAppointmentByDate(date);
        return !appointments.isEmpty();
    }

    @Override
    public List<DoctorRecommendationDto> doctorRecommendation(long appointmentId) {
        log.info("Getting doctor recommendation dto for appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        Doctor doctor = restTemplate.getForObject(settingServiceUrl+"/doctors/doctor/"+appointment.getAppointmentId()+"/profile", Doctor.class);
        List<DoctorRecommendationDto> doctors = restTemplate.getForObject(settingServiceUrl+"/doctors/doctor/"+doctor.getSpeciality()+"/get-all-profiles", List.class);
        return doctors;
    }

    @Override
    public boolean isAppointmentExists(long appointmentId) {
        log.info("Checking if appointment exists with appointment id "+appointmentId);
        return appointmentRepository.existsById(appointmentId);
    }

    @Override
    public DoctorAppointmentDto getAppointmentById(long appointmentId) {
        log.info("Getting doctor appointment dto for appointment id "+appointmentId);
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()-> new ResourceNotFoundException("Appointment not found with appointment Id: "+ appointmentId));
        DoctorAppointmentDto appointmentDto = modelMapper.map(appointment, DoctorAppointmentDto.class);
        return appointmentDto;
    }

    @Override
    public List<Appointment> getAllAppointmentsByPetId(long petId) {
        log.info("Getting all the appointments for pet id "+petId);
        List<Appointment> appointments = appointmentRepository.getAppointmentsByPetId(petId);
        if(appointments.isEmpty()){
            log.error("Appointments not found for pet id "+petId);
            throw new ResourceNotFoundException("Appointments not found");
        }
        return appointments;
    }

    @Override
    public boolean isAppointmentExistsForPetId(long petId) {
        log.info("Checking if appointments exists for pet id "+petId);
        List<Appointment> appointments = appointmentRepository.getAppointmentsByPetId(petId);
        return !appointments.isEmpty();
    }

    @Override
    public List<Clinic> getClinicRecommendations(String address) {
        log.info("Getting clinic recommendations");
        if(isClinicRecommendationExists(address)){
            List<Clinic> clinics = restTemplate.getForObject(settingServiceUrl+"/clinics/get-clinic-recommendation/"+address, List.class);
            return clinics;
        }else{
            log.error("Clinic recommendations not found");
            throw new ResourceNotFoundException("Clinic recommendations not found");
        }
    }

    @Override
    public boolean isClinicRecommendationExists(String address) {
        log.info("Checking if clinic recommendations exists for address: "+address);
        ResponseEntity<Boolean> response = restTemplate.getForEntity(settingServiceUrl+"/clinics/check/clinics/"+address, Boolean.class);
        return Boolean.TRUE.equals(response.getBody());
    }

}
