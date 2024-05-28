package com.codecool.teamup.service;

import com.codecool.teamup.model.weapon.Weapon;
import com.codecool.teamup.repository.WeaponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class WeaponService {

    private final WeaponRepository weaponRepository;

    @Autowired
    public WeaponService(WeaponRepository weaponRepository) {
        this.weaponRepository = weaponRepository;
    }

    public List<Weapon> getAllWeapons() {
        return weaponRepository.findAll();
    }

    public Optional<Weapon> getWeaponById(long id) {
        return weaponRepository.findById(id);
    }
}
