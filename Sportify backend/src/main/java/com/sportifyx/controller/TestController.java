// src/main/java/com/sportifyx/controller/TestController.java

package com.sportifyx.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String home() {
        return "Spring Boot backend is running!";
    }

    @GetMapping("/api/test")
    public String testApi() {
        return "API is working!";
    }
}
