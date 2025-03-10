import React from "react";
import "../index.css";
import "./Header.scss";
import logo from "../assets/group.png";
export default function Header({ activeTab, setActiveTab }) {
  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1>InfoHub</h1>
          <img src={logo} alt="app-logo" />
        </div>
      </header>
    </>
  );
}
