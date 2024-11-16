import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ProductCreationPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const history = useHistory();

  const handleImageUpload = (e) => {
    setImages(e.target.files);
  };

  const handleCreateProduct = async (e) => {
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
      await axios.post("http://localhost:5000/api/cars/create", formData, {
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

  return (
    <div>
      <h1>Create a New Car</h1>
      <form onSubmit={handleCreateProduct}>
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
          placeholder="Tags (comma separated)"
        />
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
        />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductCreationPage;
