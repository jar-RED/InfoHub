import React, { useState } from "react";
import "./EditDeleteButton.scss";
import Swal from "sweetalert2";
import editBtn from "../assets/edit.png";
import deleteBtn from "../assets/delete.png";

export default function EditDeleteButtons({ user, onEdit, onDelete }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    contact_num: user.contact_num,
  });

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUser = {
      id: user.id,
      name: editedData.name,
      email: editedData.email,
      address: editedData.address,
      contact_num: editedData.contact_num,
    };

    onEdit(updatedUser);
    setIsEditModalOpen(false);

    Swal.fire({
      icon: "success",
      title: "Updated Successfully!",
      text: `User information has been updated.`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleDelete = () => {
    onDelete(user);
    setIsDeleteModalOpen(false);

    Swal.fire({
      icon: "success",
      title: "Deleted Successfully!",
      text: `User has been removed.`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <div className="actions">
      <button className="edit-btn" onClick={() => setIsEditModalOpen(true)}>
        <img src={editBtn} alt="edit" />
      </button>

      <button className="delete-btn" onClick={() => setIsDeleteModalOpen(true)}>
        <img src={deleteBtn} alt="delete" />
      </button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User Information</h3>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleInputChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={editedData.email}
              onChange={handleInputChange}
            />

            <label>Address</label>
            <input
              type="text"
              name="address"
              value={editedData.address}
              onChange={handleInputChange}
            />

            <label>Contact Number</label>
            <input
              type="tel"
              name="contact_num"
              value={editedData.contact_num}
              onChange={handleInputChange}
            />

            <div className="modal-actions">
              <button onClick={handleSave} className="save-btn">
                Save
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this user?</p>
            <div className="modal-actions">
              <button onClick={handleDelete} className="delete-confirm-btn">
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
