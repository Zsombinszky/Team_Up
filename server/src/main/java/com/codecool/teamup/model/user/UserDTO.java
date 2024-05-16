package com.codecool.teamup.model.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDate;
@JsonIgnoreProperties(ignoreUnknown = true)
public record UserDTO(String username, String password, String email, String birthDate) {
}
