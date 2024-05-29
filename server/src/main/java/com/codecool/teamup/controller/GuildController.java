package com.codecool.teamup.controller;

import com.codecool.teamup.model.guild.Guild;
import com.codecool.teamup.model.guild.GuildDTO;
import com.codecool.teamup.service.GuildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/guild")
public class GuildController {
    private GuildService guildService;

    @Autowired
    public GuildController(GuildService guildService) {
        this.guildService = guildService;
    }


    @PostMapping("/create")
    public void createGuild(@RequestParam long userId, @RequestBody GuildDTO guildDTO) {
        guildService.registerGuild(userId, guildDTO);
    }
}
