// api.js

const API_BASE_URL = 'http://localhost:5000/api'; // Base URL for the backend
// Create a new car (with image upload)
export const createCar = async (carData, token) => {
  const formData = new FormData();
  formData.append('title', carData.title);
  formData.append('description', carData.description);
  formData.append('tags', JSON.stringify(carData.tags)); // If tags are an array, send it as a string
  carData.images.forEach(image => formData.append('images', image)); // Assuming images is an array of files

  try {
    const response = await fetch(`${API_BASE_URL}/cars/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Add token for protected route
      },
      body: formData, // Sending form data (not JSON)
    });

    if (!response.ok) {
      throw new Error('Failed to create car');
    }

    return await response.json(); // Return the created car
  } catch (error) {
    console.error('Error creating car:', error);
    throw error;
  }
};


// Get all cars for the logged-in user
export const getAllCars = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token for protected route
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }

    return await response.json(); // Return list of cars from backend
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

// Get a particular car by ID
export const getCarById = async (id, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token for protected route
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch car data');
    }

    return await response.json(); // Return the car data from backend
  } catch (error) {
    console.error('Error fetching car:', error);
    throw error;
  }
};

// User login
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    return await response.json(); // Assuming the response includes a 'token' on success
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Search cars globally
export const searchCars = async (keyword, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/search?keyword=${keyword}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token for protected route
      },
    });

    if (!response.ok) {
      throw new Error('Failed to search cars');
    }

    return await response.json(); // Assuming the backend returns filtered cars
  } catch (error) {
    console.error('Error searching cars:', error);
    throw error;
  }
};

// Update a car (with image upload)
export const updateCar = async (id, updatedCarData, token) => {
  const formData = new FormData();
  formData.append('title', updatedCarData.title);
  formData.append('description', updatedCarData.description);
  formData.append('tags', JSON.stringify(updatedCarData.tags)); // If tags are an array, send it as a string
  updatedCarData.images.forEach(image => formData.append('images', image)); // Assuming images is an array of files

  try {
    const response = await fetch(`${API_BASE_URL}/cars/update/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`, // Add token for protected route
      },
      body: formData, // Sending form data (not JSON)
    });

    if (!response.ok) {
      throw new Error('Failed to update car');
    }

    return await response.json(); // Return updated car
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};


// Delete a car
export const deleteCar = async (id, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token for protected route
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete car');
    }

    return await response.json(); // Return success message or deleted car info
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
};
