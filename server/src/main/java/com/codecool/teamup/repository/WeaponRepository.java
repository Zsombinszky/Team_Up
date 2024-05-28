package com.codecool.teamup.repository;

import com.codecool.teamup.model.weapon.Weapon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeaponRepository extends JpaRepository<Weapon, Long> {
}
