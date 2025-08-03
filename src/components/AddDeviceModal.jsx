import React, { useState } from "react";

const AddDeviceModal = ({ isOpen, onClose, onSubmit }) => {
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "Light",
  });

  if (!isOpen) return null; // αν δεν είναι ανοιχτό, δεν εμφανίζεται τίποτα

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-white">
          Add New Device
        </h2>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(newDevice);
            setNewDevice({ name: "", type: "Light" });
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="deviceName"
              className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1"
            >
              Device Name
            </label>
            <input
              id="deviceName"
              name="deviceName"
              type="text"
              value={newDevice.name}
              onChange={(e) =>
                setNewDevice({ ...newDevice, name: e.target.value })
              }
              required
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="deviceType"
              className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1"
            >
              Device Type
            </label>
            <select
              id="deviceType"
              value={newDevice.type}
              onChange={(e) =>
                setNewDevice({ ...newDevice, type: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-white"
            >
              <option value="Light">Light</option>
              <option value="Thermostat">Thermostat</option>
              <option value="Camera">Camera</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-300 dark:bg-zinc-700 text-zinc-800 dark:text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeviceModal;



