import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BASE_URL } from "config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
};

const ProductModal = ({ isOpen, onClose, onSubmit, product, mode }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}admin_panel/category_list/`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
  
        if (data.success && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, []);
  

  useEffect(() => {
    if (mode === "edit" && product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setStock(product.stock || "");

      const selectedCategory = categories.find(
        (cat) => cat.id === product.category_id
      );
      setCategory(selectedCategory || null);

      const existingImages = product.image.map(
        (img) => `${BASE_URL}/media/${img}`
      );
      setImagePreviews(existingImages);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory(null);
      setImages([]);
      setImagePreviews([]);
    }
  }, [mode, product, categories]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);

    // Preview new uploaded images
    const newPreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description); // Quill stores HTML, so this is fine
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category_id", category?.id || "");
    images.forEach((image) => formData.append("image", image));
    onSubmit(formData);
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="product-modal-title">
      <Box sx={style}>
        <Typography id="product-modal-title" variant="h6" component="h2" mb={2}>
          {mode === "edit" ? "Edit Product" : "Add New Product"}
        </Typography>
        <TextField
          fullWidth
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <ReactQuill
          value={description}
          onChange={setDescription}
          placeholder="Write a description..."
          theme="snow"
          style={{ height: "150px", width: "100%" }}
        />
        <Autocomplete
          fullWidth
          options={categories}
          getOptionLabel={(option) => option.name || ""}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={category}
          onChange={(event, newValue) => setCategory(newValue)}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params} placeholder="Category" margin="normal" />
          )}
        />
        <TextField
          fullWidth
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" component="label" sx={{ mt: 2 }} style={{ color: "white" }}>
          Upload Images
          <input type="file" hidden multiple onChange={handleImageChange} />
        </Button>
        <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
          {imagePreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index}`}
              style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
            />
          ))}
        </Box>
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onClose} style={{ color: "black" }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} style={{ color: "white" }}>
            {mode === "edit" ? "Save Changes" : "Add Product"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  product: PropTypes.object,
  mode: PropTypes.oneOf(["add", "edit"]).isRequired,
};

export default ProductModal;
