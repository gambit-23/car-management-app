import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const [car, setCar] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchCar = async () => {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`http://localhost:5000/api/cars/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setCar(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setTags(response.data.tags.join(", "));
    };
    fetchCar();
  }, [id]);

  const handleEditProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });

    const token = localStorage.getItem("authToken");

    try {
      await axios.put(`http://localhost:5000/api/cars/${id}`, formData, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      });
      history.push("/dashboard");
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  const handleDeleteProduct = async () => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      history.push("/dashboard");
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <div>
      {car && (
        <>
          <h1>{car.title}</h1>
          <p>{car.description}</p>
          <p>{car.tags.join(", ")}</p>
          <button onClick={handleDeleteProduct}>Delete Product</button>
          <form onSubmit={handleEditProduct}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Car Title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags"
            />
            <input
              type="file"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
            <button type="submit">Save Changes</button>
          </form>
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
