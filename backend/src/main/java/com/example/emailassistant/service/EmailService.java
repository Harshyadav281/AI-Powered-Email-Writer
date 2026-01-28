package com.example.emailassistant.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.emailassistant.dto.GeminiRequest;
import com.example.emailassistant.dto.GeminiResponse;

import reactor.core.publisher.Mono;

@Service
public class EmailService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    @Autowired
    private WebClient webClient;   // 👈 @Autowired use kiya

    public Mono<String> generateEmail(String emailText, String type) {

        String prompt = buildPrompt(emailText , type);

        GeminiRequest request = new GeminiRequest(
                List.of(
                        new GeminiRequest.Content(
                                "user",
                                List.of(new GeminiRequest.Part(prompt))
                        )
                )
        );

        return webClient.post()
                .uri(apiUrl)
                .header("Content-Type", "application/json")
                .header("x-goog-api-key", apiKey)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(GeminiResponse.class)
                .map(res ->
                        res.getCandidates()
                           .get(0)
                           .getContent()
                           .getParts()
                           .get(0)
                           .getText()
                );
    }
    private String buildPrompt(String emailText, String type) {
        return """
        Write a %s professional email.
        Do NOT assume or invent names, dates, designations, or companies.
        Do NOT use placeholders like [Name] or [Date].
        Keep the email generic and ready to send.

        Message:
        %s
        """.formatted(type, emailText);
    }


}
