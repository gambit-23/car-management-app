import React, { useState, useEffect } from 'react';
import { getAllCars } from '../services/api';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const data = await getAllCars(token); // Fetch all cars
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div>
      <h1>All Cars</h1>
      <ul>
        {cars.length > 0 ? (
          cars.map((car) => (
            <li key={car._id}>
              <h2>{car.title}</h2>
              <p>{car.description}</p>
              <p>Tags: {car.tags.join(', ')}</p>
              <p>Images:</p>
              <ul>
                {car.images.length > 0 ? (
                  car.images.map((image, index) => (
                    <li key={index}>
                      <img src={image} alt={`Car Image ${index + 1}`} width="100" />
                    </li>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </ul>
            </li>
          ))
        ) : (
          <p>No cars found</p> // Fallback message when no cars are available
        )}
      </ul>
    </div>
  );
};

export default CarList;
