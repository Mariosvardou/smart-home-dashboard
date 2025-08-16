

export default function DeviceCard({
  icon,
  title,
  status,
  type,
  temperature,
  onToggle,
  onSetTemperature,
  onDelete,
}) {
  const bgColors = {
    Light: "bg-yellow-600",
    Thermostat: "bg-red-600",
    Camera: "bg-green-600",
  };

  console.log("Device type:", type);

  return (
    <div
      className={`border border-zinc-700 rounded-lg p-5 shadow-md flex flex-col ${
        bgColors[type] || "bg-zinc-800"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-600 transition"
          title="Delete Device"
        >
          &#10005;
        </button>
      </div>

      <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>

      <p className="text-gray-200 mb-4">{status}</p>

 {type === "Light" && (
  <label className="relative inline-flex items-center cursor-pointer w-12 h-6">
    <input
      type="checkbox"
      checked={status === "On"}
      onChange={onToggle}
      className="peer sr-only"
    />
    <div className="w-12 h-6 rounded-full bg-gray-400 transition-colors peer-checked:bg-yellow-500"></div>
    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-6"></div>
  </label>
)}



      {type === "Thermostat" && (
        <input
          type="range"
          min="10"
          max="30"
          step="0.5"
          value={temperature || 21}
          onChange={(e) => onSetTemperature(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg cursor-pointer accent-blue-600"
        />
      )}
    </div>
  );
}















