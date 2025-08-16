import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import {  firestore } from "../firebase";

export default function AddDeviceModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("light");
  const [room, setRoom] = useState("Living Room");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    setLoading(true);
    try {
      await addDoc(collection(firestore, "devices"), {
        name,
        type,
        room,
        status: "off"
      });
      setName("");
      setRoom("Living Room");
      setType("light");
      onClose();
    } catch (err) {
      console.error("Error adding device:", err);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Add New Device
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Device Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm dark:bg-zinc-800 dark:border-zinc-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm dark:bg-zinc-800 dark:border-zinc-700"
            >
              <option value="light">Light</option>
              <option value="thermostat">Thermostat</option>
              <option value="camera">Camera</option>
              <option value="sensor">Sensor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Room</label>
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm dark:bg-zinc-800 dark:border-zinc-700"
            >
              <option value="Living Room">Living Room</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Bathroom">Bathroom</option>
              <option value="Office">Office</option>
              <option value="Garage">Garage</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              {loading ? "Adding..." : "Add Device"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


