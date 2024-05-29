package com.codecool.teamup.service;

import com.codecool.teamup.model.guild.Guild;
import com.codecool.teamup.model.guild.GuildDTO;
import com.codecool.teamup.model.user.User;
import com.codecool.teamup.repository.GuildRepository;
import com.codecool.teamup.repository.UserRepository;
import com.codecool.teamup.repository.WeaponRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    public String registerGuild(long userId, GuildDTO guild) {
        Guild newGuild = new Guild();
        newGuild.setGuildName(guild.guildName());
        newGuild.setGuildBadge(guild.guildBadge());
        newGuild.setMissionStatement(guild.missionStatement());

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            guildRepository.save(newGuild);
            newGuild.setChieftain(user);
            user.setGuild(newGuild);
            userRepository.save(user);
            return "Guild registered successfully";
        } else {
            return "User not found";
        }
    }
}
