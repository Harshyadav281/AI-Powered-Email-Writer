package com.example.emailassistant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.emailassistant.dto.EmailRequest;
import com.example.emailassistant.dto.EmailResponse;
import com.example.emailassistant.service.EmailService;

import reactor.core.publisher.Mono;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class EmailController {

    @Autowired
    private EmailService emailService;   

    @PostMapping("/email")
    public Mono<EmailResponse> generateEmail(
            @RequestBody EmailRequest request) {

        return emailService
                .generateEmail(request.getEmailText(), request.getType())
                .map(EmailResponse::new);
    }
}
