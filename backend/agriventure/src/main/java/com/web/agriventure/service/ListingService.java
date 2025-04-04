package com.web.agriventure.service;


import com.web.agriventure.model.Listing;
import com.web.agriventure.repositories.ListingRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ListingService {
    private final ListingRepo listingRepo;

    public ListingService(ListingRepo listingRepo) {
        this.listingRepo = listingRepo;
    }
    public List<Listing> getAllListing(){
        return listingRepo.findAll();
    }
    public Optional<Listing> getListingById(long id){
        return listingRepo.findById(id);
    }
    public Listing createListing(Listing Listing){
        return listingRepo.save(Listing);
    }
    public Listing updateListing(long id,Listing updatedListing){
        return listingRepo.findById(id)
                .map(listing ->{
                    listing.setTitle(updatedListing.getTitle());
                    listing.setDescription(updatedListing.getDescription());
                    listing.setLocation(updatedListing.getLocation());
                    listing.setImageUrl(updatedListing.getImageUrl());
                    listing.setMaxGuests(updatedListing.getMaxGuests());
                    listing.setPricePerNight(updatedListing.getPricePerNight());
                    return listingRepo.save(listing);
                }).orElseThrow(()->new RuntimeException("Listing not found"));
    }
    public void deleteListing(long id){
        listingRepo.deleteById(id);
    }
}
