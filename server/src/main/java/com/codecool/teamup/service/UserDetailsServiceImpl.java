package com.codecool.teamup.service;

import com.codecool.teamup.model.entity.Role;
import com.codecool.teamup.model.user.MyUser;
import com.codecool.teamup.model.user.UserEntity;
import com.codecool.teamup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            UserEntity userEntityDetails = user.get();
            List<SimpleGrantedAuthority> grantedAuthorities = new ArrayList<>();
            for (Role role : getRoles(userEntityDetails)) {
                grantedAuthorities.add(new SimpleGrantedAuthority(role.name()));
            }
            return new MyUser(userEntityDetails.getId(), userEntityDetails.getUsername(), userEntityDetails.getPassword(), grantedAuthorities);
        } else {
            throw new UsernameNotFoundException(username);
        }
    }

    public List<Role> getRoles(UserEntity userEntity) {
        List<Role> rolesList = new ArrayList<>();
        String[] roleArray = userEntity.getRole().split(",");
        for (String role : roleArray) {
            Role roleObj = Role.valueOf(role.toUpperCase());
            rolesList.add(roleObj);
        }
        return rolesList;
    }
}
