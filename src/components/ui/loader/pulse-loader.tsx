const PulseLoader = ({ isActive }) => {
  const shadowColor = isActive ? "#69ffa8" : "#e95555";

  return (
    <div
      className="pulse-loader mr-2 h-2 w-2 rounded-full animate-pulse"
      style={{
        backgroundColor: shadowColor,
        "--shadow-color": shadowColor,
        "--shadow-color-transparent": `${shadowColor}00`,
      }}
    ></div>
  );
};

export default PulseLoader;
