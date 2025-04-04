package com.web.agriventure.model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String description;
    private String location;
    private double pricePerNight;
    private int maxGuests;
    private String imageUrl;
}
