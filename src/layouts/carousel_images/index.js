import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import CarouselImageModal from "./CarouselImageModal";
import { BASE_URL } from "config";
import "./carouselImages.css";

function CarouselImages() {
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}admin_panel/list_carousel_images/`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setImages(data.carousel_images);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAddNewImage = () => {
    setModalMode("add");
    setSelectedImage(null);
    setModalOpen(true);
  };

  const handleEditImage = (image) => {
    setModalMode("edit");
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleDeleteImage = () => {
    const formData = new FormData();
    formData.append("carousel_image_id", selectedImage.id);
    fetch(`${BASE_URL}admin_panel/delete_carousel_image/`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setImages(images.filter((img) => img.id !== selectedImage.id));
          setDeleteConfirmOpen(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (formData) => {
    if (modalMode === "edit") {
      formData.append("carousel_image_id", selectedImage.id);
    }

    const url = `${BASE_URL}admin_panel/${
      modalMode === "add" ? "add_carousel_image/" : "update_carousel_image/"
    }`;

    fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" sx={{ my: 2 }}>
          Carousel Images
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 80 }}
            style={{ color: "white" }}
            onClick={handleAddNewImage}
          >
            Add New Carousel Image
          </Button>
        </Typography>
        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <Card className="carousel-card">
                <CardMedia
                  component="img"
                  image={`${BASE_URL}media/${image.image}`}
                  alt={image.alt_text || "Carousel Image"}
                  className="carousel-card-image"
                />
                <div className="hover-overlay">
                  <CardActions>
                    <IconButton color="primary" onClick={() => handleEditImage(image)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setSelectedImage(image);
                        setDeleteConfirmOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Modal for Add/Edit */}
        <CarouselImageModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          image={selectedImage}
          mode={modalMode}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this image?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmOpen(false)}>No</Button>
            <Button onClick={handleDeleteImage} color="error">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </DashboardLayout>
  );
}

export default CarouselImages;
