import React, { useState, useEffect } from "react";
import AddDeviceModal from "./AddDeviceModal";
import { firestore } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function DevicesDashboard() {
  const { user } = useAuth();
  const [devices, setDevices] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) return;

    const devicesCol = collection(firestore, "devices");
    const unsubscribe = onSnapshot(devicesCol, (snapshot) => {
      const devicesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDevices(devicesData);
    });

    return () => unsubscribe();
  }, [user]);

 

  const handleToggleLight = async (id, currentState) => {
    const deviceRef = doc(firestore, "devices", id);
    await updateDoc(deviceRef, {
      isOn: !currentState,
    });
  };

  const handleSetTemperature = async (id, value) => {
    const deviceRef = doc(firestore, "devices", id);
    await updateDoc(deviceRef, {
      temperature: value,
    });
  };

  const handleAddDevice = async (newDevice) => {
    let deviceToAdd = { ...newDevice };

    if (newDevice.type === "Light") {
      deviceToAdd.isOn = false;
    } else if (newDevice.type === "Thermostat") {
      deviceToAdd.temperature = 20;
    }

    const devicesCol = collection(firestore, "devices");
    await addDoc(devicesCol, deviceToAdd);
    setShowModal(false);
  };

  return (
      <div className="max-w-7xl mx-auto p-6 bg-zinc-900 min-h-screen">
      <AddDeviceModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddDevice}
      />
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">My Smart Devices</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition"
        >
          + Add Device
        </button>
      </div>

      {devices.length === 0 ? (
        <p className="text-center text-gray-400 mt-20 italic">
          No devices added yet.
        </p>
      ) : (
        <div className="bg-zinc-800 rounded-2xl shadow-lg p-6 flex flex-col justify-between min-h-[180px] border border-zinc-700 hover:ring-2 hover:ring-blue-500 transition">
          {devices.map((device) => (
            <div
              key={device.id}
              className="bg-zinc-800 rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:ring-2 hover:ring-blue-500 transition"
            >
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {device.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Type: <span className="font-medium">{device.type}</span>
                </p>
              </div>

              {/* Render Light */}
              {device.type === "Light" && (
                <div className="flex items-center space-x-4 mt-auto">
                  <button
                    onClick={() =>
                      handleToggleLight(device.id, device.isOn)
                    }
                    className={`w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${
                      device.isOn
                        ? "bg-green-500"
                        : "bg-gray-600"
                    }`}
                    aria-label={
                      device.isOn ? "Turn off light" : "Turn on light"
                    }
                  >
                    <div
                      className={`h-7 w-7 bg-white rounded-full shadow transform transition-transform duration-300 ${
                        device.isOn ? "translate-x-7" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="text-gray-300 font-medium">
                    {device.isOn ? "On" : "Off"}
                  </span>
                </div>
              )}

              {/* Render Thermostat */}
              {device.type === "Thermostat" && (
                <div className="mt-auto">
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="0.5"
                    value={device.temperature || 20}
                    onChange={(e) =>
                      handleSetTemperature(
                        device.id,
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full h-2 rounded-lg bg-blue-300 dark:bg-blue-700 accent-blue-600 dark:accent-blue-400 mb-2"
                  />
                  <p className="text-center text-gray-300 font-medium">
                    {device.temperature?.toFixed(1) || 20}°C
                  </p>
                </div>
              )}

              {/* Render Camera */}
              {device.type === "Camera" && (
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 bg-green-700 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                    📷 Live Camera
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}












  
