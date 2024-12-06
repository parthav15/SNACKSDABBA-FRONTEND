import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import CategoryModal from "./CategoryModal";
import "./category.css";
import { BASE_URL } from "config";

function Categories() {
  const columns = ["S. No.", "Category Name", "Description", "Image", "Actions"];
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [animateTable, setAnimateTable] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}admin_panel/category_list/`)
      .then((response) => response.json())
      .then((data) => {
        setRows(data.categories);
        setAnimateTable(true);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAddNewCategory = () => {
    setModalMode("add");
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setModalMode("edit");
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleDeleteCategory = () => {
    const requestBody = {
      category_id: selectedCategory.id,
    };

    fetch(`${BASE_URL}admin_panel/delete_category/`, {
      method: "DELETE",
      body: JSON.stringify(requestBody),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted:", data);
        setRows(rows.filter((row) => row.id !== selectedCategory.id));
        setDeleteConfirmOpen(false);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (formData) => {
    const url = modalMode === "add" 
      ? `${BASE_URL}admin_panel/add_category/`
      : `${BASE_URL}admin_panel/edit_category/${selectedCategory.id}/`;

    fetch(url, {
      method: modalMode === "add" ? "POST" : "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h4">Categories</SoftTypography>
              <Button variant="contained" color="primary" style={{ color: "white" }} onClick={handleAddNewCategory}>
                Add New Category
              </Button>
            </SoftBox>
            <div className={`table-container ${animateTable ? "animate" : ""}`}>
              <table className="products-table">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.name}</td>
                      <td>{row.description}</td>
                      <td>
                        <img
                          src={`${BASE_URL}media/${row.image}`}
                          alt="Category"
                          style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                        />
                      </td>
                      <td>
                        <IconButton
                          color="secondary"
                          aria-label="edit product"
                          onClick={() => handleEditCategory(row)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          aria-label="delete product"
                          onClick={() => {
                            setSelectedCategory(row);
                            setDeleteConfirmOpen(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </SoftBox>
      </SoftBox>

      {/* Category Modal */}
      <CategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        category={selectedCategory}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteCategory} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Categories;
