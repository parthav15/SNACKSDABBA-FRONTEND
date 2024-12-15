import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import "./user.css";

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
  ];
  const [rows, setRows] = useState([]);
  const [animateTable, setAnimateTable] = useState(false);

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
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Users;

