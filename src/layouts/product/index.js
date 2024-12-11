import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
    const url =
      modalMode === "add"
        ? `${BASE_URL}admin_panel/add_product/`
        : `${BASE_URL}admin_panel/update_product/${currentProduct.id}/`;

    const method = modalMode === "add" ? "POST" : "PUT";

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
                        <IconButton color="error" aria-label="delete product">
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

      {/* Product Modal */}
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
