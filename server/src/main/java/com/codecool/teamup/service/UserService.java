package com.codecool.teamup.service;

import com.codecool.teamup.model.request.LoginRequest;
import com.codecool.teamup.model.user.User;
import com.codecool.teamup.model.user.UserDTO;
import com.codecool.teamup.model.weapon.Weapon;
import com.codecool.teamup.repository.UserRepository;
import com.codecool.teamup.repository.WeaponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final WeaponRepository weaponRepository;

    @Autowired
    public UserService(UserRepository userRepository, WeaponRepository weaponRepository) {
        this.userRepository = userRepository;
        this.weaponRepository = weaponRepository;
    }

    public String registerUser(UserDTO user) {
        User newUser = new User();
        newUser.setUsername(user.username());
        newUser.setPassword(user.password());
        newUser.setEmail(user.email());
        newUser.setBirthdate(LocalDate.parse(user.birthDate()));
        newUser.setImage(user.image());
        newUser.setLevel(user.level());
        newUser.setTitle(user.title());
        userRepository.save(newUser);
        return "User registered successfully";
    }

    public Long loginUser(LoginRequest loginRequest) {
        Optional<User> optionalUser = userRepository.findByUsername(loginRequest.getUsername());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                return user.getId();
            }
        }
        return null;
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
            user.setEmail(updatedUser.getEmail());
            user.setBirthdate(updatedUser.getBirthdate());
            user.setImage(updatedUser.getImage());
            user.setLevel(updatedUser.getLevel());
            user.setTitle(updatedUser.getTitle());
            userRepository.save(user);
            return "User updated successfully";
        }
        return "User not found";
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void addWeaponByName(String weaponName, long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<Weapon> optionalWeapon = weaponRepository.findByName(weaponName);
        if (optionalUser.isPresent() && optionalWeapon.isPresent()) {
            User user = optionalUser.get();
            Weapon weapon = optionalWeapon.get();
            user.getWeapons().add(weapon);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User or weapon not found");
        }
    }
}
