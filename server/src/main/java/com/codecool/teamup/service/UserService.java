package com.codecool.teamup.service;

import com.codecool.teamup.model.JwtResponse;
import com.codecool.teamup.model.entity.Role;
import com.codecool.teamup.model.request.LoginRequest;
import com.codecool.teamup.model.user.NewUserDTO;
import com.codecool.teamup.model.user.UserDTO;
import com.codecool.teamup.model.user.UserEntity;
import com.codecool.teamup.model.weapon.Weapon;
import com.codecool.teamup.repository.UserRepository;
import com.codecool.teamup.repository.WeaponRepository;
import com.codecool.teamup.security.jwt.JwtUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final WeaponRepository weaponRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Autowired
    public UserService(UserRepository userRepository, WeaponRepository weaponRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.weaponRepository = weaponRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public String registerUser(NewUserDTO user) {
        UserEntity newUser = new UserEntity();
        newUser.setUsername(user.username());
        newUser.setPassword(passwordEncoder.encode(user.password()));
        newUser.setEmail(user.email());
        newUser.setBirthdate(LocalDate.parse(user.birthDate()));
        newUser.setImage(user.image());
        newUser.setLevel(user.level());
        newUser.setTitle(user.title());
        newUser.setRole(String.valueOf(Role.ROLE_USER));
        userRepository.save(newUser);
        return "User registered successfully";
    }

    public JwtResponse loginUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        String jwt = jwtUtils.generateJwtToken(authentication);

        User user = (User) authentication.getPrincipal();
        List<String> roles = user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return new JwtResponse(jwt, user.getUsername(), roles);
    }

    @Transactional
    public String deleteUser(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = ((UserDetails) authentication.getPrincipal()).getUsername();
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            if (optionalUser.get().getUsername().equals(currentUsername) ||
                    authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
                userRepository.delete(optionalUser.get());
                return "User deleted successfully";
            } else {
                return "Unauthorized delete request";
            }
        }
        return "User not found";
    }

    @Transactional
    public String updateUser(Long id, UserEntity updatedUser) {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
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

    public UserDTO getUserById(Long id) {
        Optional<UserEntity> userEntity = userRepository.findById(id);
        if (userEntity.isPresent()) {
            UserEntity user = userEntity.get();
            return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getBirthdate(), user.getLevel(),
                    user.getTitle(), user.getImage());
        }
        throw new RuntimeException("User not found");
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public void addWeaponByName(String weaponName, long userId) {
        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        Optional<Weapon> optionalWeapon = weaponRepository.findByName(weaponName);
        if (optionalUser.isPresent() && optionalWeapon.isPresent()) {
            UserEntity user = optionalUser.get();
            Weapon weapon = optionalWeapon.get();
            if (user.getWeapons().contains(weapon)) {
                throw new IllegalArgumentException("This weapon is already in user favorites");
            } else if (user.getWeapons().size() >= 3) {
                throw new RuntimeException("User can only have 3 weapons");
            }
            user.getWeapons().add(weapon);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User or weapon not found");
        }
    }
}
