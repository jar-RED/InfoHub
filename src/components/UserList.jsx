import React from "react";
import EditDeleteButtons from "./EditDeleteButton";
import "./UserList.scss";

export default function UserList({ users, onEdit, onDelete }) {
  return (
    <div className="user-list-container">
      <h2>Users List</h2>
      <div className="user-list">
        {users.length === 0 ? (
          <p>No user data available.</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id || index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.contact_num}</td>
                  <td>
                    <EditDeleteButtons
                      user={user}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
