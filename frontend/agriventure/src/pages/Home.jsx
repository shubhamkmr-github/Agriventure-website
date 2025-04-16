

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';
import '../css/Home.css';

const Home = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8989/api/listing')
      .then(response => setListings(response.data))
      .catch(error => console.error('Error fetching listings:', error));
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Explore Unique Stays</h1>
      <div className="listings-grid">
        {listings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default Home;
