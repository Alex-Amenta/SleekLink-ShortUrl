const PulseLoader = ({ isActive }: { isActive: boolean }) => {
  const shadowColor = isActive ? "#69ffa8" : "#e95555";

  return (
    <div
      className="pulse-loader mr-2 h-2 w-2 rounded-full animate-pulse"
      style={{
        backgroundColor: shadowColor,
        ["--shadow-color" as string]: shadowColor,
        ["--shadow-color-transparent" as string]: `${shadowColor}00`,
      }}
    ></div>
  );
};

export default PulseLoader;
