package com.sportifyx.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    // Root endpoint
    @GetMapping("/")
    public String home() {
        return "✅ SportifyX backend is running successfully!";
    }

    // Optional: A quick test endpoint
    @GetMapping("/api/test")
    public String testApi() {
        return "✅ /api/test is working fine!";
    }
}
