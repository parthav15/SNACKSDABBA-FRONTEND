import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SoftTypography from "components/SoftTypography";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { BASE_URL } from "config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "100%",
    sm: "80%",
    md: "60%",
    lg: "90%",
  },
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4
};

const CategoryModal = ({ isOpen, onClose, onSubmit, category, mode }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (mode === "edit" && category) {
      setName(category.name || "");
      setDescription(category.description || "");
      setImage(category.image || null);
      setImageUrl(`${BASE_URL}media/${category.image}` || null);
    } else {
      setName("");
      setDescription("");
      setImage(null);
      setImageUrl(null);
    }
  }, [mode, category]);

  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append("category_name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    onSubmit(formData);
    onClose();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title">
      <Box sx={style}>
        <SoftTypography variant="h5" mb={2}>
          {mode === "edit" ? "Edit Category" : "Add New Category"}
        </SoftTypography>
        <TextField
          fullWidth
          placeholder="Category Name"
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
        <Box mt={2} display="flex" alignItems="center">
          <Button variant="contained" component="label" sx={{ mt: 2 }} style={{ color: "white" }}>
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {imageUrl && (
            <Box ml={2} display="flex" alignItems="center">
              <img
                src={imageUrl}
                alt="Category Image"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginTop: "20px",
                  marginLeft: "10px"
                }}
              />
            </Box>
          )}
        </Box>
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onClose} style={{ color: "black" }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleFormSubmit} style={{ color: "white" }}>
            {mode === "edit" ? "Save Changes" : "Add Category"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

CategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
  mode: PropTypes.oneOf(["add", "edit"]).isRequired,
};

CategoryModal.defaultProps = {
  category: null,
};

export default CategoryModal;