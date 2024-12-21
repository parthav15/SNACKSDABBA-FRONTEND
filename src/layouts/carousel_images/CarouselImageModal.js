import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SoftTypography from "components/SoftTypography";
import { Autocomplete } from "@mui/material";

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
  p: 4,
};

const CarouselImageModal = ({ isOpen, onClose, onSubmit, image, mode }) => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [altText, setAltText] = useState("");
  const [hoverText, setHoverText] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}admin_panel/product_list/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch Products.");
        }
        const data = await response.json();

        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Unexpected response format: ", data);
        }
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
    }, []);

  useEffect(() => {
    if (mode === "edit" && image) {
      setTitle(image.title || "");
      setCaption(image.caption || "");
      setAltText(image.alt_text || "");
      setHoverText(image.hover_text || "");
      setExternalLink(image.external_link || "");
      setImageFile(image.image || null);
      setImageUrl(`${BASE_URL}media/${image.image}` || null);

      const selectedProduct = products.find((product) => product.id === image.product__id);
      if (selectedProduct) {
        setProduct(selectedProduct);
      }
    } else {
      setTitle("");
      setCaption("");
      setAltText("");
      setHoverText("");
      setExternalLink("");
      setProduct(null);
      setImageFile(null);
      setImageUrl(null);
    }
  }, [mode, image, products]);

  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("alt_text", altText);
    formData.append("hover_text", hoverText);
    formData.append("external_link", externalLink);
    formData.append("product_id", product ? product.id : null);
    if (imageFile) formData.append("image", imageFile);

    onSubmit(formData);
    onClose();
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title">
      <Box sx={style}>
        <SoftTypography variant="h5" mb={2}>
          {mode === "edit" ? "Edit Carousel Image" : "Add New Carousel Image"}
        </SoftTypography>
        <TextField
          fullWidth
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          placeholder="Alt Text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          placeholder="Hover Text"
          value={hoverText}
          onChange={(e) => setHoverText(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          placeholder="External Link"
          value={externalLink}
          onChange={(e) => setExternalLink(e.target.value)}
          margin="normal"
        />
        <Autocomplete
          fullWidth
          options={products}
          getOptionLabel={(option) => option.name || ""}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={product}
          onChange={(event, newValue) => setProduct(newValue)}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params} placeholder="Product" margin="normal" />
          )}
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
                alt="Carousel Preview"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                  objectFit: "cover",
                  marginTop: "20px",
                  marginLeft: "10px",
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
            {mode === "edit" ? "Save Changes" : "Add Image"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

CarouselImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  image: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    alt_text: PropTypes.string,
    image: PropTypes.string,
    caption: PropTypes.string,
    hover_text: PropTypes.string,
    external_link: PropTypes.string,
    product__id: PropTypes.number,
  }),
  mode: PropTypes.oneOf(["add", "edit"]).isRequired,
};

CarouselImageModal.defaultProps = {
  image: null,
};

export default CarouselImageModal;