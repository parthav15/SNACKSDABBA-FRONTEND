import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./UserDetailModal.css";

const UserDetailModal = ({ open, onClose, userData }) => {
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

  if (!userData || !open) return null;

  const { user, orders, shipping_addresses, billing_addresses, cart, wishlist } = userData;

  return (
    <div className={`modal-overlay ${animationClass}`} onClick={handleClose}>
      <div
        className={`modal-container ${animationClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-header">User Details</h2>
        <div className="modal-grid">
          {[
            { label: "Name", data: `${user.first_name} ${user.last_name}` },
            { label: "Email", data: user.email },
            { label: "Phone", data: user.phone_number },
            { label: "Username", data: user.username },
            { label: "Country", data: user.country || "N/A" },
            { label: "City", data: user.city || "N/A" },
            { label: "Address", data: user.address || "N/A" },
            { label: "Zip Code", data: user.zip_code || "N/A" },
          ].map((item, index) => (
            <div className="info-card" key={index}>
              <span className="label">{item.label}</span>
              <span className="data">{item.data}</span>
            </div>
          ))}
        </div>

        <h3 className="modal-subheader">Orders</h3>
        <table className="modal-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>₹{order.total_price}</td>
                <td>{order.status}</td>
                <td>{order.payment_status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="modal-subheader">Addresses</h3>
        <table className="modal-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Type</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {shipping_addresses?.map((address, index) => (
              <tr key={`shipping-${index}`}>
                <td>{index + 1}</td>
                <td>Shipping</td>
                <td>
                  {address.address_line1}, {address.city}, {address.state}, {address.country}
                </td>
              </tr>
            ))}
            {billing_addresses?.map((address, index) => (
              <tr key={`billing-${index}`}>
                <td>{shipping_addresses?.length + index + 1}</td>
                <td>Billing</td>
                <td>
                  {address.address_line1}, {address.city}, {address.state}, {address.country}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="modal-subheader">Cart Items</h3>
        <table className="modal-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart?.items?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="modal-subheader">Wishlist</h3>
        <table className="modal-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Product</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Added At</th>
            </tr>
          </thead>
          <tbody>
            {wishlist?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.product.name}</td>
                <td>₹{item.product.price}</td>
                <td>{item.product.discount_price}</td>
                <td>{new Date(item.added_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

UserDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userData: PropTypes.object,
};

export default UserDetailModal;

