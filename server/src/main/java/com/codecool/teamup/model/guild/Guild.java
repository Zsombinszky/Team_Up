package com.codecool.teamup.model.guild;

import com.codecool.teamup.model.user.User;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "guilds")
public class Guild {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String guildName;

    private String guildBadge;

    @OneToOne
    private User chieftain;

    @OneToMany(mappedBy = "guild", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<User> members;

    private String missionStatement;

    public Guild() {
    }

    public Guild(String guildName, String guildBadge, User chieftain, String missionStatement) {
        this.guildName = guildName;
        this.guildBadge = guildBadge;
        this.chieftain = chieftain;
        this.missionStatement = missionStatement;
        this.members = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGuildName() {
        return guildName;
    }

    public void setGuildName(String guildName) {
        this.guildName = guildName;
    }

    public String getGuildBadge() {
        return guildBadge;
    }

    public void setGuildBadge(String guildBadge) {
        this.guildBadge = guildBadge;
    }

    public User getChieftain() {
        return chieftain;
    }

    public void setChieftain(User chieftain) {
        this.chieftain = chieftain;
    }

    public List<User> getMembers() {
        return members;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public void addMember(User user) {
        members.add(user);
    }

    public String getMissionStatement() {
        return missionStatement;
    }

    public void setMissionStatement(String missionStatement) {
        this.missionStatement = missionStatement;
    }
}
