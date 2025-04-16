import React, { useState } from 'react';
import axios from 'axios';
import '../css/AddListing.css';

const AddListing = () => {
  const [listing, setListing] = useState({
    title: '',
    description: '',
    location: '',
    pricePerNight: '',
    maxGuests: '',
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setListing((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      if (!listing.image) {
        throw new Error('Please select an image file');
      }

      // Upload image to Cloudinary
      const cloudName = 'dhjfywyep';
      const uploadPreset = 'Agriventure';

      const formData = new FormData();
      formData.append('file', listing.image);
      formData.append('upload_preset', uploadPreset);

      console.log("Uploading to Cloudinary...");
      
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        formData
      );

      const imageUrl = cloudinaryRes.data.secure_url;
      console.log("Image uploaded successfully:", imageUrl);

      // Get JWT token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      console.log("Token retrieved:", token.substring(0, 10) + "...");

      // Prepare listing data with image URL
      const listingData = {
        title: listing.title,
        description: listing.description,
        location: listing.location,
        pricePerNight: parseFloat(listing.pricePerNight),
        maxGuests: parseInt(listing.maxGuests),
        imageUrl: imageUrl
      };

      console.log("Sending listing data to backend:", listingData);

      // Send listing data to backend
      // IMPORTANT: Make sure the token is prefixed with "Bearer "
      const response = await axios.post(
        'http://localhost:8989/api/listing',
        listingData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Listing created:", response.data);
      alert('Listing added successfully!');
      
      // Reset form
      setListing({
        title: '',
        description: '',
        location: '',
        pricePerNight: '',
        maxGuests: '',
        image: null,
      });
      
    } catch (error) {
      console.error('Error uploading listing:', error);
      
      let message = 'Failed to upload listing';
      
      if (error.response) {
        console.error('Server response:', error.response.data);
        message = error.response.data.message || message;
      } else if (error.message) {
        message = error.message;
      }
      
      setErrorMsg(message);
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-listing-container">
      <h2>Add New Listing</h2>
      {errorMsg && <div className="error-message">{errorMsg}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title" 
          placeholder="Title" 
          value={listing.title} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="description" 
          placeholder="Description" 
          value={listing.description} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="location" 
          placeholder="Location" 
          value={listing.location} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="pricePerNight" 
          placeholder="Price per night" 
          value={listing.pricePerNight} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="maxGuests" 
          placeholder="Max guests" 
          value={listing.maxGuests} 
          onChange={handleChange} 
          required 
        />
        <div className="file-input-wrapper">
          <label htmlFor="image-upload">Upload Image:</label>
          <input 
            id="image-upload"
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            required 
          />
          {listing.image && (
            <div className="file-info">
              Selected: {listing.image.name}
            </div>
          )}
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Listing'}
        </button>
      </form>
    </div>
  );
};

export default AddListing;