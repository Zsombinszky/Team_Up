package com.codecool.teamup.service;

import com.codecool.teamup.model.entity.Role;
import com.codecool.teamup.model.guild.Guild;
import com.codecool.teamup.model.guild.GuildDTO;
import com.codecool.teamup.model.user.MyUser;
import com.codecool.teamup.model.user.UserEntity;
import com.codecool.teamup.repository.GuildRepository;
import com.codecool.teamup.repository.UserRepository;
import com.codecool.teamup.repository.WeaponRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuildService {

    private static final Logger log = LoggerFactory.getLogger(GuildService.class);
    private final GuildRepository guildRepository;
    private final UserRepository userRepository;
    private final WeaponRepository weaponRepository;

    public GuildService(GuildRepository guildRepository, UserRepository userRepository, WeaponRepository weaponRepository) {
        this.guildRepository = guildRepository;
        this.userRepository = userRepository;
        this.weaponRepository = weaponRepository;
    }

    public List<Guild> getAllGuilds() {
        return guildRepository.findAll();
    }

    public Optional<Guild> getGuildById(Long id) {
        return guildRepository.findById(id);
    }

    public void registerGuild(long userId, GuildDTO guild) {
        Guild newGuild = new Guild();
        newGuild.setGuildName(guild.guildName());
        newGuild.setGuildBadge(guild.guildBadge());
        newGuild.setMissionStatement(guild.missionStatement());

        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            guildRepository.save(newGuild);
            newGuild.setChieftain(user);
            user.setGuild(newGuild);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void deleteGuildById(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = ((MyUser) authentication.getPrincipal()).getId();
        Optional<Guild> optionalGuild = guildRepository.findById(id);
        if (optionalGuild.isPresent()) {
            if (optionalGuild.get().getChieftain().getId().equals(userId) || authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
                guildRepository.deleteById(id);
            } else {
                throw new IllegalArgumentException("Unauthorized delete request");
            }
        } else {
            throw new IllegalArgumentException("Guild not found");
        }
    }
}
