import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../services/api'; // Import the function to get car details from API

const CarDetail = () => {
  const { id } = useParams(); // Extract the car ID from the URL
  const [car, setCar] = useState(null); // State to store the car details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const carData = await getCarById(id, token); // Fetch car data by ID
        setCar(carData); // Update the car state
      } catch (err) {
        setError('Failed to fetch car details');
        console.error(err); // Log any error
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchCarData(); // Call the fetch function when component mounts

  }, [id]); // Re-run the effect if the car ID changes

  if (loading) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error if fetching fails
  }

  // Display the car details
  return (
    <div>
      <h1>{car.title}</h1> {/* Display car title */}
      <p>Description: {car.description}</p> {/* Display description */}
      <p>Tags: {car.tags.join(', ')}</p> {/* Display tags, joining them into a string */}
      <div>
        <h3>Images:</h3>
        {car.images.map((image, index) => (
          <img key={index} src={image} alt={`Car Image ${index + 1}`} /> // Render images
        ))}
      </div>
    </div>
  );
};

export default CarDetail;
