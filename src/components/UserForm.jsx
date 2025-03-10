import React, { useState } from "react";
import "./UserForm.scss";
import Swal from "sweetalert2";
import supabase from "../supabase-client";

export default function UserForm({ addUser }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.firstName && formData.lastName && formData.email) {
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: formData.address,
        contact_num: formData.contactNumber,
      };

      try {
        const { data, error } = await supabase
          .from("UsersList")
          .insert([userData])
          .select()
          .single();

        if (error) throw error;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User has been successfully added.",
          showConfirmButton: false,
          timer: 2000,
        });

        addUser(data);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          contactNumber: "",
        });
      } catch (error) {
        console.error("Error saving data:", error.message);

        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to save user data. Please try again.",
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <div className="user-form">
      <div className="form-container">
        <h2>Enter User Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Contact Number"
            />
          </div>

          <button type="submit">Save User</button>
        </form>
      </div>
    </div>
  );
}
