import React from "react";
import "./NavBar.scss";
export default function NavBar({ activeTab, setActiveTab }) {
  return (
    <>
      <div className="nav-bar">
        <div className="tab-buttons">
          <button
            className={activeTab === "input" ? "active" : ""}
            onClick={() => setActiveTab("input")}
          >
            Add User
          </button>
          <button
            className={activeTab === "view" ? "active" : ""}
            onClick={() => setActiveTab("view")}
          >
            View Users
          </button>
        </div>
      </div>
    </>
  );
}
