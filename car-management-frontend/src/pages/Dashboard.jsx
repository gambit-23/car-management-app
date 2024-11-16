import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/api/cars/list", {
        headers: {
          "x-auth-token": token,
        },
      });
      setCars(response.data);
    };
    fetchCars();
  }, []);

  const handleSearch = () => {
    return cars.filter(
      (car) =>
        car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  };

  return (
    <div>
      <h1>Your Cars</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search cars"
      />
      <ul>
        {handleSearch().map((car) => (
          <li key={car._id}>
            <Link to={`/product/${car._id}`}>
              <h3>{car.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
