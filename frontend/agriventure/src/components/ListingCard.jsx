import React from 'react';
import '../css/ListingCard.css';

const ListingCard = ({ listing }) => {
  return (
    <div className="card">
      <img src={listing.imageUrl} alt={listing.title} />
      <div className="card-content">
        <div className="card-title">{listing.title}</div>
        <div className="card-location">{listing.location}</div>
        <div className="card-description">{listing.description}</div>
        <div className="card-footer">
          <span>${listing.pricePerNight}/night</span>
          <span>Guests: {listing.maxGuests}</span>
        </div>
        <div className="card-actions">
          <button className="view-details-button">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
