package com.codecool.teamup.service;

import com.codecool.teamup.model.request.LoginRequest;
import com.codecool.teamup.model.user.User;
import com.codecool.teamup.model.user.UserDTO;
import com.codecool.teamup.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String registerUser(UserDTO user) {
        User newUser = new User();
        newUser.setUsername(user.username());
        newUser.setPassword(user.password());
        newUser.setEmail(user.email());
        newUser.setBirthdate(LocalDate.parse(user.birthDate()));
        userRepository.save(newUser);
        return "User registered successfully";
    }

    public String loginUser(LoginRequest loginRequest) {
        Optional<User> optionalUser = userRepository.findByUsername(loginRequest.getUsername());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                return "Login successful";
            }
        }
        return "Invalid username or password";
    }

    public String deleteUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            userRepository.delete(optionalUser.get());
            return "User deleted successfully";
        }
        return "User not found";
    }

    public String updateUser(Long id, User updatedUser) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUsername(updatedUser.getUsername());
            user.setPassword(updatedUser.getPassword());
            userRepository.save(user);
            return "User updated successfully";
        }
        return "User not found";
    }

    public User getUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
