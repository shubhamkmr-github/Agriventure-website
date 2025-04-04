package com.web.agriventure.controller;

import com.web.agriventure.model.Listing;
import com.web.agriventure.service.ListingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/listing")
public class ListingController {
    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }
    @GetMapping
    public List<Listing> getAllListing(){
        return listingService.getAllListing();
    }
    @GetMapping("/{id}")
    public Optional<Listing> getListingById(@PathVariable long id){
        return listingService.getListingById(id);
    }
    @PostMapping
    public Listing createListing(@RequestBody Listing listing){
        return listingService.createListing(listing);
    }
    @PutMapping("/{id}")
    public Listing updateListing(@PathVariable long id,@RequestBody Listing updateListing){
        return listingService.updateListing(id,updateListing);
    }
    @DeleteMapping("{id}")
    public String deleteListing(@PathVariable long id){
        listingService.deleteListing(id);
        return "Listing removed successfully";
    }


}
