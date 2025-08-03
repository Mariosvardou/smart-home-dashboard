import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Βεβαιώσου ότι είναι σωστό το path

export default function Header() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // optional: redirect ή ειδοποίηση
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 shadow-md">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        Smart Home Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </header>
  );
}