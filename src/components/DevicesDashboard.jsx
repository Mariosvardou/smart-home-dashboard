import React, { useState, useEffect } from "react";
import AddDeviceModal from "./AddDeviceModal";
import DeviceCard from "./DeviceCard";
import { firestore } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Plus } from "lucide-react";

export default function DevicesDashboard({ search, selectedRoom }) {
  const { user } = useAuth();
  const [devices, setDevices] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(firestore, "devices"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedDevices = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDevices(fetchedDevices);
    });

    return () => unsubscribe();
  }, [user]);

  const handleToggleLight = async (id, currentState) => {
    const ref = doc(firestore, "devices", id);
    await updateDoc(ref, { status: !currentState });
  };

  const handleSetTemperature = async (id, value) => {
    const ref = doc(firestore, "devices", id);
    await updateDoc(ref, { temperature: value });
  };

  const handleAddDevice = async (device) => {
    const newDeviceWithDefaults = {
      ...device,
      userId: user.uid,
      ...(device.type === "Light" && { status: false }),
      ...(device.type === "Thermostat" && { temperature: 21 }),
    };

    const ref = collection(firestore, "devices");
    await addDoc(ref, newDeviceWithDefaults);
    setShowModal(false);
  };

  const handleDeleteDevice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this device?")) return;
    await deleteDoc(doc(firestore, "devices", id));
  };

  // 🔹 Filtering by search & room
  const filteredDevices = devices.filter((device) => {
    const matchesSearch = search
      ? device.name.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesRoom =
      selectedRoom && selectedRoom !== "all"
        ? device.room?.toLowerCase() === selectedRoom.toLowerCase()
        : true;

    return matchesSearch && matchesRoom;
  });

  const renderDeviceCards = () =>
    filteredDevices.map((device) => {
      const { id, name, type, status, temperature } = device;

      let icon = "🔌";
      let deviceStatus = "";

      switch (type) {
        case "Light":
          icon = "💡";
          deviceStatus = status ? "On" : "Off";
          break;
        case "Thermostat":
          icon = "🌡️";
          deviceStatus =
            typeof temperature === "number"
              ? `${temperature.toFixed(1)}°C`
              : "N/A";
          break;
        case "Camera":
          icon = "📷";
          deviceStatus = "Live Feed";
          break;
        default:
          deviceStatus = "Unknown device";
      }

      return (
        <DeviceCard
          key={id}
          icon={icon}
          title={name}
          status={deviceStatus}
          type={type}
          temperature={temperature}
          onToggle={() => handleToggleLight(id, status)}
          onSetTemperature={(val) => handleSetTemperature(id, val)}
          onDelete={() => handleDeleteDevice(id)}
        />
      );
    });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-zinc-900 min-h-screen relative z-0 rounded-xl shadow-md">
      {/* Device Modal */}
      <AddDeviceModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddDevice}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">My Smart Devices</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition"
        >
          <Plus size={18} />
          Add Device
        </button>
      </div>

      {/* Devices Grid */}
      {filteredDevices.length === 0 ? (
        <p className="text-center text-gray-400 mt-20 italic">
          No devices found. Try changing your search or filters.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {renderDeviceCards()}
        </div>
      )}
    </div>
  );
}







  
