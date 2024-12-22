import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import "./user.css";
import UserDetailModal from "./UserDetailModal";

import { BASE_URL } from "config";

function Users() {
  const columns = [
    "S. No.",
    "First Name",
    "Last Name",
    "Username",
    "Phone Number",
    "Date of Birth",
    "Martial Status",
    "Login By",
    "Date Joined",
    "Last Login",
    "Two Factor",
    "Actions"
  ];
  const [rows, setRows] = useState([]);
  const [animateTable, setAnimateTable] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewUser = (userId) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("user_id", userId);

    fetch(`${BASE_URL}admin_panel/user_detail/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setSelectedUser(data.user_details);
        setIsModalOpen(true);
      } else {
        console.error(data.message);
      }
    })
    .catch((error) => console.error(error));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}admin_panel/users_list/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRows(data.user_list);
        setAnimateTable(true);
      })
      .catch((error) => console.error(error));
  };

  const handleToggleUser = (row) => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}admin_panel/users_list_toggle/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: row.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchUsers();
        }
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
              <SoftTypography variant="h4">Users</SoftTypography>
            </SoftBox>
            <div className={`table-container ${animateTable ? "animate" : ""}`}>
              {rows.length > 0 && (
                <table className="users-table">
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
                        <td>{row.first_name}</td>
                        <td>{row.last_name}</td>
                        <td>{row.username}</td>
                        <td>{row.phone_number}</td>
                        <td>{row.date_of_birth}</td>
                        <td>{row.martial_status}</td>
                        <td>{row.login_by}</td>
                        <td>{row.date_joined ? row.date_joined.split("T")[0] : ""}</td>
                        <td>{row.last_login ? row.last_login.split("T")[0] : ""}</td>
                        <td>
                          <Switch
                            checked={row.two_factor}
                            onChange={() => handleToggleUser(row)}
                          />
                        </td>
                        <td>
                          <IconButton color="primary" onClick={() => handleViewUser(row.id)}>
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton color="error">
                            <EditIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </SoftBox>
      </SoftBox>
      <UserDetailModal
        open={isModalOpen}
        onClose={handleCloseModal}
        userData={selectedUser}
      />
    </DashboardLayout>
  );
}

export default Users;

