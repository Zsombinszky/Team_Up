package com.codecool.teamup.controller;

import com.codecool.teamup.model.weapon.Weapon;
import com.codecool.teamup.service.WeaponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/weapons")
public class WeaponController {

    private final WeaponService weaponService;

    @Autowired
    public WeaponController(WeaponService weaponService) {
        this.weaponService = weaponService;
    }

    @GetMapping()
    public List<Weapon> getWeapons() {
        return weaponService.getAllWeapons();
    }

    @GetMapping("/{id}")
    public Weapon getWeaponById(@PathVariable int id) {
        if (weaponService.getWeaponById(id).isPresent()) {
            return weaponService.getWeaponById(id).get();
        }
        throw new RuntimeException("Weapon not found");
    }
}
