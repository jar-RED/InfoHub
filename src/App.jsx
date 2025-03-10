import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import supabase from "./supabase-client";
import "./index.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("input");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("UsersList").select("*");

      if (error) {
        console.error("Error fetching users:", error.message);
      } else {
        setUsers(data || []);
      }
    };

    fetchUsers();
  }, []);

  const addUser = (user) => {
    const newUser = {
      id: user.id,
      name: user.name,
      email: user.email || "N/A",
      address: user.address || "N/A",
      contact_num: user.contact_num || "N/A",
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleEdit = async (updatedUser) => {
    try {
      const { error } = await supabase
        .from("UsersList")
        .update(updatedUser)
        .eq("id", updatedUser.id);

      if (error) throw error;

      const { data } = await supabase.from("UsersList").select("*");

      setUsers(data || []);
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  const handleDelete = async (userToDelete) => {
    try {
      const { error } = await supabase
        .from("UsersList")
        .delete()
        .eq("email", userToDelete.email);

      if (error) throw error;

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.email !== userToDelete.email)
      );
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <div>
      <Header />
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        <AnimatePresence mode="wait">
          {activeTab === "input" && (
            <motion.div
              key="input"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <UserForm addUser={addUser} />
            </motion.div>
          )}

          {activeTab === "view" && (
            <motion.div
              key="view"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <UserList
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
