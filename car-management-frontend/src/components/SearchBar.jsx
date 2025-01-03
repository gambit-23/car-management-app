import React, { useState, useEffect } from 'react';
import { searchCars } from '../services/api'; // Create a separate API function for search

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query) {
        try {
          const data = await searchCars(query); // Use searchCars to send the query
          setCars(data);
          onSearch(data); // Update parent with search results
        } catch (error) {
          console.error('Error searching cars:', error);
        }
      } else {
        setCars([]); // Clear results if no query
        onSearch([]); // Clear results in parent component
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn); // Cleanup timeout
  }, [query, onSearch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search cars..."
        value={query}
        onChange={handleChange}
      />
      <div>
        {cars.length > 0 && (
          <ul>
            {cars.map((car) => (
              <li key={car._id}>{car.title}</li> // Assuming your car schema includes 'title'
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
