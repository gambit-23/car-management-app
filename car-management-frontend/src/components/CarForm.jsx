import React, { useState } from 'react';
import axios from 'axios';

const CarForm = () => {
  const [car, setCar] = useState({
    title: '',
    description: '',
    tags: '',
    images: '', // You will need to handle image uploads separately (e.g., using a file input)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare tags and images
    const tagsArray = car.tags.split(',').map(tag => tag.trim()); // Convert comma-separated tags to an array
    const imagesArray = car.images.split(',').map(image => image.trim()); // Convert comma-separated image paths to an array

    const carData = { 
      title: car.title,
      description: car.description,
      tags: tagsArray,
      images: imagesArray,
    };

    // Make a POST request to your backend to add the car
    try {
      const response = await axios.post('http://localhost:5000/api/cars', carData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you have JWT in localStorage
        },
      });
      console.log('Car submitted:', response.data);
      // Optionally redirect or reset the form after successful submission
    } catch (err) {
      console.error('Error adding car:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={car.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={car.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div>
        <label>Tags (comma separated)</label>
        <input
          type="text"
          name="tags"
          value={car.tags}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Images (comma separated URLs)</label>
        <input
          type="text"
          name="images"
          value={car.images}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CarForm;
