package com.pratian.SettingsService.Entities;

import com.pratian.SettingsService.Enums.Prefix;
import com.pratian.SettingsService.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PetOwner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ownerId;

    private String ownerName;

    private String username;

    private String phone;

    private String email;

    private String address;

    private String profilePicture = "default.jpg";

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private Prefix prefix;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id")
    private List<Pet> pets;
}
