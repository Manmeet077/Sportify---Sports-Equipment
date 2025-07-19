package com.sportifyx.controller;

import com.sportifyx.model.User;
import com.sportifyx.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

  @Autowired
  private UserRepository userRepo;

  @PostMapping("/register")
  public String register(@RequestBody User user) {
    if (userRepo.existsByEmail(user.getEmail()))
      return "Email already registered.";
    userRepo.save(user);
    return "Registration successful!";
  }

  @PostMapping("/login")
  public String login(@RequestBody User user) {
    User validUser = userRepo.findByEmailAndPasswordAndRole(user.getEmail(), user.getPassword(), user.getRole());
    if (validUser != null) return "Login successful as " + user.getRole();
    else return "Invalid credentials.";
  }
}
