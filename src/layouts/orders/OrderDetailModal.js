import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./OrderDetailModal.css";

const OrderDetailModal = ({ open, onClose, orderData }) => {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (open) {
      setAnimationClass("");
    }
  }, [open]);

  const handleClose = () => {
    setAnimationClass("close-animation");
    setTimeout(onClose, 1000);
  };

  if (!orderData || !open) return null;

  return (
    <div className={`modal-overlay ${animationClass}`} onClick={handleClose}>
      <div
        className={`modal-container ${animationClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-header">Order Details</h2>
        <div className="modal-grid">
          <div className="modal-section">
            <p>
              <strong>Customer:</strong> {orderData.user?.first_name}{" "}
              {orderData.user?.last_name}
            </p>
            <p>
              <strong>Email:</strong> {orderData.user?.email}
            </p>
            <p>
              <strong>Phone:</strong> {orderData.user?.phone_number}
            </p>
          </div>
          <div className="modal-section">
            <p>
              <strong>Total Price:</strong> ${orderData.total_price}
            </p>
            <p>
              <strong>Discount:</strong> ${orderData.discount_amount}
            </p>
            <p>
              <strong>Gift:</strong> {orderData.is_gift ? "Yes" : "No"}
            </p>
          </div>
          <div className="modal-section">
            <p>
              <strong>Status:</strong>{" "}
              <span className="status-pill">{orderData.status}</span>
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              <span className="payment-pill">{orderData.payment_status}</span>
            </p>
            <p>
              <strong>Payment Method:</strong> {orderData.payment_method || "N/A"}
            </p>
            <p>
              <strong>Tracking Number:</strong>{" "}
              {orderData.tracking_number || "N/A"}
            </p>
          </div>
        </div>
        <h3 className="modal-subheader">Addresses</h3>
        <table className="modal-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Shipping Address</td>
              <td>
                {orderData.shipping_address?.address_line1},{" "}
                {orderData.shipping_address?.address_line2} <br />
                {orderData.shipping_address?.city},{" "}
                {orderData.shipping_address?.state},{" "}
                {orderData.shipping_address?.country} -{" "}
                {orderData.shipping_address?.postal_code}
              </td>
            </tr>
            <tr>
              <td>Billing Address</td>
              <td>
                {orderData.billing_address?.address_line1},{" "}
                {orderData.billing_address?.address_line2} <br />
                {orderData.billing_address?.city},{" "}
                {orderData.billing_address?.state},{" "}
                {orderData.billing_address?.country} -{" "}
                {orderData.billing_address?.postal_code}
              </td>
            </tr>
          </tbody>
        </table>
        <h3 className="modal-subheader">Order Items</h3>
        <table className="modal-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orderData.order_items?.map((item) => (
              <tr key={item.id}>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>${item.product.price}</td>
                <td>${item.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

OrderDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  orderData: PropTypes.object,
};

export default OrderDetailModal;
