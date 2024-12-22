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
          <div className="modal-grid">
            {[
              { label: "Name", data: `${orderData.user?.first_name} ${orderData.user?.last_name}` },
              { label: "Email", data: orderData.user?.email },
              { label: "Phone", data: orderData.user?.phone_number },
              { label: "Username", data: orderData.user?.username },
              { label: "Country", data: orderData.user?.country || "N/A" },
              { label: "City", data: orderData.user?.city || "N/A" },
              { label: "Address", data: orderData.user?.address || "N/A" },
              { label: "Zip Code", data: orderData.user?.zip_code || "N/A" },
              { label: "Total Price", data: `INR ${orderData.total_price}` },
              { label: "Discount", data: `INR ${orderData.discount_amount}` },
              { label: "Gift", data: orderData.is_gift ? "Yes" : "No" },
              { label: "Status", data: orderData.status },
              { label: "Payment Status", data: orderData.payment_status },
              { label: "Payment Method", data: orderData.payment_method || "N/A" },
              { label: "Tracking Number", data: orderData.tracking_number || "N/A" },
            ].map((item, index) => (
              <div className="info-card" key={index}>
                <span className="label">{item.label}</span>
                <span className="data">{item.data}</span>
              </div>
            ))}
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
                <td>INR {item.product.price}</td>
                <td>INR {item.subtotal}</td>
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

