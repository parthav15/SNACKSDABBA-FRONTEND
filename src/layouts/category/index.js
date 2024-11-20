import React from "react";
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
import Footer from "examples/Footer";

import "./product.css";

function Categories() {
  const columns = ["Product Name", "Category", "Price", "Stock", "Actions"];
  const rows = [
    { name: "Sample Product", category: "Sample Category", price: "$100", stock: 10 },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h4">Products Table</SoftTypography>
              <Button variant="contained" color="primary">
                Add New Product
              </Button>
            </SoftBox>
            <div className="table-container">
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
                      <td>{row.name}</td>
                      <td>{row.category}</td>
                      <td>{row.price}</td>
                      <td>{row.stock}</td>
                      <td>
                        <IconButton color="primary" aria-label="view product">
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="edit product">
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
      <Footer />
    </DashboardLayout>
  );
}

export default Categories;
