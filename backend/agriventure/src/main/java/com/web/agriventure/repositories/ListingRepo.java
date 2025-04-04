package com.web.agriventure.repositories;

import com.web.agriventure.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingRepo extends JpaRepository <Listing,Long> {

}
