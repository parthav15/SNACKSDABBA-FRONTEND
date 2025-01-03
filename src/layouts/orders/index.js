import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Icon from "@mui/material/Icon";
import Chip from "@mui/material/Chip";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import "./order.css";
import OrderDetailModal from "./OrderDetailModal";
import { BASE_URL } from "config";

function Orders() {
  const columns = [
    "S.No.",
    "Customer Name",
    "Total Price",
    "Discount",
    "Gift",
    "Order Status",
    "Payment Status",
    "Payment Method",
    "Created At",
    "Actions",
  ];
  const [rows, setRows] = useState([]);
  const [animateTable, setAnimateTable] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orderDetailModalOpen, setOrderDetailModalOpen] = useState(false);
  const [selectedOrderData, setSelectedOrderData] = useState(null);

  const statusColors = {
    Pending: 'orange',
    Processing: 'blue',
    'In Transit': 'purple',
    Shipped: 'green',
    Delivered: 'green',
    Cancelled: 'red',
    Refunded: 'red',
  };
  
  const paymentStatusColors = {
    'Not Paid': 'red',
    Paid: 'green',
    Refunded: 'green',
  };
  
  const paymentMethodColors = {
    'Credit Card': 'blue',
    'Debit Card': 'blue',
    PayPal: 'blue',
    'Cash on Delivery': 'green',
    'Bank Transfer': 'green',
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}admin_panel/list_orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRows(data.orders);
          setAnimateTable(true);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleViewOrder = (orderId) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("order_id", orderId);

    fetch(`${BASE_URL}admin_panel/order_detail/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            setSelectedOrderData(data.response_data);
            setOrderDetailModalOpen(true);
        } else {
            console.error(data.message);
        }
    })
    .catch((error) => console.error(error));
  };

  const handleOrderDetailModalClose = () => {
    setOrderDetailModalOpen(false);
    setSelectedOrderData(null);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/authentication/sign-in";
    }
  })

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h4">Orders</SoftTypography>
            </SoftBox>
            <div className={`table-container ${animateTable ? "animate" : ""}`}>
              <table className="orders-table">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                {rows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="text-center"
                        style={{
                          backgroundColor: "#fff",
                          padding: "0.8rem",
                          fontSize: "1.5rem",
                          fontWeight: 500,
                          color: "#6c757d",
                        }}
                      >
                        <div className="d-flex justify-content-center">
                          <div style={{marginTop: '0.25rem'}}>
                            <Icon className="me-2" fontSize="large">
                              shopping_cart
                            </Icon>
                          </div>
                          <span>No orders available yet</span>
                        </div>
                      </td>
                    </tr>
                ) : (
                    rows.map((row, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{`${row.user__first_name} ${row.user__last_name}`}</td>
                        <td>{row.total_price}</td>
                        <td>{row.discount_amount}</td>
                        <td>
                          {row.is_gift ? (
                            <Icon sx={{ color: "green", fontSize: "24px !important" }}>check_circle</Icon>
                          ) : (
                            <Icon sx={{ color: "red", fontSize: "24px !important" }}>cancel</Icon>
                          )}
                        </td>
                        <td>
                          <Chip label={row.status} color={statusColors[row.status] === 'green' ? 'success' : statusColors[row.status] === 'red' ? 'error' : 'info'} />
                        </td>
                        <td>
                          <Chip label={row.payment_status} color={paymentStatusColors[row.payment_status] === 'green' ? 'success' : paymentStatusColors[row.payment_status] === 'red' ? 'error' : 'info'} />
                        </td>
                        <td>
                          <Chip label={row.payment_method ? row.payment_method : 'N/A'} color={paymentMethodColors[row.payment_method] === 'green' ? 'success' : paymentMethodColors[row.payment_method] === 'blue' ? 'primary' : 'info'} />
                        </td>
                        <td>{new Date(row.created_at).toLocaleString()}</td>
                        <td>
                        <IconButton
                            color="primary"
                            aria-label="view order"
                            onClick={() => handleViewOrder(row.id)}
                        >
                            <VisibilityIcon />
                        </IconButton>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
              </table>
            </div>
          </Card>
        </SoftBox>
      </SoftBox>

      <OrderDetailModal 
        open={orderDetailModalOpen}
        onClose={handleOrderDetailModalClose}
        orderData={selectedOrderData}
      />
    </DashboardLayout>
  );
}

export default Orders;