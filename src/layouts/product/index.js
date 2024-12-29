import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import ProductModal from "./ProductModal";
import "./product.css";
import { BASE_URL } from "config";

function Products() {
  const columns = ["S.No.", "Product Name", "Category", "Price", "Stock", "Actions"];
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [animateTable, setAnimateTable] = useState(false);
  const [deleteProductConfirmOpen, setDeleteProductConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}admin_panel/product_list/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRows(data.products);
        setAnimateTable(true);
      })
      .catch((error) => console.error(error));
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setModalMode("add");
    setModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = (formData) => {
    const token = localStorage.getItem("token");
    const url = `${BASE_URL}admin_panel/${modalMode === "add" ? "add_product" : "update_product"}/`;

    const method = "POST";

    if (modalMode === "edit") {
      formData.append("product_id", currentProduct.id);
    }

    fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit product");
        }
        return response.json();
      })
      .then(() => {
        fetchProducts(); 
        setModalOpen(false);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteProduct = () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("product_id", selectedProduct.id);

    fetch(`${BASE_URL}admin_panel/delete_product/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        return response.json();
      })
      .then(() => {
        setRows(rows.filter((row) => row.id !== selectedProduct.id));
        setDeleteProductConfirmOpen(false);
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
              <SoftTypography variant="h4">Products</SoftTypography>
              <Button
                variant="contained"
                color="primary"
                style={{ color: "white" }}
                onClick={handleAddProduct}
              >
                Add New Product
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
                      <td>{row.category__name}</td>
                      <td>{row.price}</td>
                      <td>{row.stock}</td>
                      <td>
                        <IconButton
                          color="secondary"
                          aria-label="edit product"
                          onClick={() => handleEditProduct(row)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          aria-label="delete product"
                          onClick={() => {
                            setSelectedProduct(row);
                            setDeleteProductConfirmOpen(true);
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

      <Dialog
        open={deleteProductConfirmOpen}
        onClose={() => setDeleteProductConfirmOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteProductConfirmOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteProduct} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {modalOpen && (
        <ProductModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          product={currentProduct}
          mode={modalMode}
          categories={rows.map((row) => ({
            id: row.category_id,
            name: row.category__name,
          }))}
        />
      )}
    </DashboardLayout>
  );
}

export default Products;
